const Airtable = require('airtable');

exports.handler = function(event, context, callback) {
  const data = JSON.parse(event.body);
  const token = data.token;

  console.log(token);

  var base = new Airtable({ apiKey: process.env.AIRTABLE_DATADVOCACY_TOKEN }).base('appiQkR2Zrww4DQnz');
  // DATA/ADVOCACY BASE

  let found = false;

  // query airtable,
  // check for token in submission list

  base('Demographics Survey').select({
    fields: ["token"],
    filterByFormula: `{token}="${token}"`
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function (record) {
      console.log(record.id);
      if (record.get("token") == token) {
        found = true;
      }

      // If there are no more records, `done` will get called.
      fetchNextPage();
    }, async function done(err) {
      if (err) { console.error(err); return; }
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          found: found
        })
      });
    });
  });
}
