const Airtable = require('airtable');
const jwt_decode = require('jwt-decode');
const aws = require('aws-sdk');

exports.handler = function(event, context, callback) {
  const data = JSON.parse(event.body);
  const token = data.access_token;
  let decoded = jwt_decode(token);

  aws.config.update({
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET_KEY
  });
  const spacesEndpoint = new aws.Endpoint("nyc3.digitaloceanspaces.com");
  const s3 = new aws.S3({
    endpoint: spacesEndpoint
  });

  let columns = {
    listing: "fldhEdkPi8horzLD4",
    discriminationType: "fldp0Cdze4QBCRIQy",
    denialType: "fldZYKk8mQAJe05b5",
    aptAvailable: "fldLDDBMmULQ5gI1n",
    intervention: "fldHfhNDDz7Vgviec",
    evidence: "fld39iqRmYpy5M8j2",
    contact: "fld0KWctTTkkMxaRW"
  }
  /* NOTE: CHANGES based on env! staging base for now */
  // this is a list of columns with dropdown options
  // to send schema to populate form

  if (decoded.app_metadata.roles[0] == 'advocate') {
    // if they've been verified as advocate only
    var base = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_STAGING }).base('appiZpVxsiS1Ev5Zv');
    // currently TEST: STAGING BASE

    // query airtable,
    // check for advocate in approved advocate list
    let clientList = [];
    let orgList = [];
    let advocateId;
    console.log(decoded.app_metadata.org);
    console.log(decoded.email);
    base('Advocates').select({
      maxRecords: 1,
      fields: ["Email Address", "Advocate Client List", "Advocate Client List Names", "Full Org Client List", "Full Org List Names"],
      filterByFormula: `{Email Address}="${decoded.email}"`
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        advocateId = record.getId();
        let ids = record.get("Advocate Client List");
        let fullOrgList = record.get("Full Org Client List");
        let names = record.get("Advocate Client List Names");
        if (names !== undefined) {
          names = names.split(",");
          for (i = 0; i < names.length; i++) {
            clientList.push({
              name: names[i],
              id: ids[i]
            });
          }
        }
        let fullOrgNames = record.get("Full Org List Names");
        if (fullOrgNames !== undefined) {
          fullOrgNames = fullOrgNames.split(",");
          for (j = 0; j < fullOrgNames.length; j++) {
            orgList.push({
              name: fullOrgNames[j],
              id: fullOrgList[j]
            });
          }
        }
        console.log(names);
        console.log(fullOrgNames);
        console.log(clientList);
        console.log(orgList);

      });
      // If there are no more records, `done` will get called.
      fetchNextPage();
    }, async function done(err) {
      if (err) { console.error(err); return; }
      console.log(`${clientList.length} user records found.`);
      let schemaList = [];
      let schema = await getSchema();
      let fields = schema.tables[1].fields; // reports table
      for (let i = 0; i < fields.length; i++) {
        let column;
        let selectOptions;
        // check if any of the field IDs match
        // the columns object written @ top
        // if so, add to array that we'll send to web form
        for (const key in columns) {
          if (columns[key] == fields[i].id) {
            column = fields[i].id;
            selectOptions = fields[i].options.choices;
            schemaList.push({ [column]: JSON.stringify(selectOptions) });
          }
        }
      }
      console.log(schemaList);
      console.log(clientList);
      console.log(orgList);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          advocate: advocateId,
          clientList: clientList,
          orgList: orgList,
          schema: schemaList
        })
      });
    });

  } else {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        message: "error, not authorized"
      })
    });
  }

  async function getSchema() {
    console.log("running schema");
    try {
        const params = {
          Bucket: 'unlock/advocate-system',
          Key: 'staging-schema.json',
        };

        const data = await s3.getObject(params).promise();
        const jsonSchema = JSON.parse(data.Body.toString('utf-8'));

        console.log(jsonSchema);
        return jsonSchema;

      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: error.message }),
          headers: {
            'Content-Type': 'application/json',
          },
        };
      }
    /*const response = await fetch('https://api.airtable.com/v0/meta/bases/appiZpVxsiS1Ev5Zv/tables', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_ACCESS_STAGING}`
      }
      });*/
  }
};
