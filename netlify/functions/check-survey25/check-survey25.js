const Airtable = require('airtable');

exports.handler = function(event, context) {
  const data = JSON.parse(event.body);
  const token = data.token;

  var base = new Airtable({ apiKey: process.env.AIRTABLE_DATADVOCACY_TOKEN }).base('appiQkR2Zrww4DQnz');
  // DATA/ADVOCACY BASE

  let found = false;

  // query airtable,
  // check for token in submission list

  base('Demographics Survey').select({
    maxRecords: 1,
    fields: ["token"],
    filterByFormula: `{token}="${token}"`
  }).firstPage(function(err, records) {
    records.forEach(function (record) {
      if (record.get("token") == token) {
        found = true;
      }
    }, async function done(err) {
      if (err) { console.error(err); return; }
      console.log(found);
      return({
        statusCode: 200,
        body: JSON.stringify({
          found: found
        })
      });
    });
  });
}
