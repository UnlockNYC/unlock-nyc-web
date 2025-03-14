const Airtable = require('airtable');
const fetch = require('node-fetch');

exports.handler = function (event, context, callback) {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_DATADVOCACY_TOKEN }).base('appiQkR2Zrww4DQnz');
  // PROD DATA/ADVOCACY BASE


  let surveyData = JSON.parse(event.body);
  console.log(surveyData);

  base('Demographics Survey').create({
    // the following uses airtable field IDs
    // instead of column names, to protect in case of changes
    "fldAPNCse9ZDdxRzT": surveyData.token, // token
    "fldr0WzUmYF8PJzXf": surveyData.voucher1, // voucher, y/n voucher1
    "fldTpUN8KnAGevFzc": surveyData["voucher-long"], // how long
    "flds5dqkDCDG8g8W2": surveyData["voucher-type"], // voucher type
    "fldzogHunGJAGUHlc": surveyData["household-size"], // houeshold size
    "fld6tUNXbbNsLyavF": surveyData["live-with-children"], // children in house
    "fldXQMxd263llYFZi": surveyData.age, // user's age
    "fldkiaL3OmYO2kBPo": surveyData.disability, // disability
    "fldZEhF5cjb39h3UC": surveyData.gender, // gender
    "fldrm8FelxdraFRFe": surveyData.lgbtq, // identify lgbtq
    "fldxq9BvZh6rQD4fN": surveyData.poc, // identify poc
    "fldxhxhkduyvqe2MF": surveyData["race-ethnicity"], // identify race/ethnicity
    "flds6R0cJuGu4WPPd": surveyData["first-language"], // user's first language
    "flddZ5gJfF80h6vwU": surveyData["housing-situation"],  // user's housing situation
    "fldFVGunnXc3eG82E": surveyData["apt-type"],  // if own apt, what type
    "fldTaNBxJWDlK0XOg": surveyData["zip-code"],  // nyc zip code
    "fldAkwM89W7qfRK5Y": surveyData["homeless-past"],  // been homeless in past
    "fldDoApBpsZUAINUM": surveyData["homeless-childhood"],  // been homeless in childhood
    "fldTHtk7Hem6UjvSv": surveyData["voucher-timeline"],  // voucher length of time
    "fldlKA4HR9O48ymCY": surveyData["hra-interaction"],  // hra interaction
    "fldOEFpHJgjxiwmKz": surveyData["hra-contact"],  // hra contact
    "fldcFBYihREGLgKGu": surveyData["hra-response-time"],  // hra response time
    "fldzcO5oMsJRI94VE": surveyData["hra-difficulty"],  // hra difficulty
    "fldCdJNA5zWeKynBW": surveyData["hra-rights-info"],  // hra rights info
    "fld2jjIfkYpMPIKp1": surveyData["housing-denial"],  // denial type
    "fld158AqK94JIXAPz": surveyData["hra-intervention"],  // hra intervention
    "fldoNLtYR1zHmH1dk": surveyData["voucher-denial-frequency"],  // how often does this happen?
    "fldCnf8duQW6y1565": surveyData["soi-report-motivation"],  // how often does this happen?
    "fldtBNqmIeP1612cE": surveyData["voucher-discrimination"],  // type of discrimination
    "fldBNVWKcJEYGQQTF": surveyData["borough"],  // borough seeking housing
    "fldrQ5f4waZV17LWq": surveyData["hired-broker"],  // ever hired broker
    "fldKEDuBZM7kk0GKX": surveyData["extra-fees"],  // encountered extra fees
    "fld6VUwUuPzB3d9PV": surveyData["extra-fees-type"],  // extra fees type
    "fldaxu0b70hPAK1co": surveyData["additional-comments"],  // additional comments
    "fldnVlspAUMnFOUsA": surveyData["follow-up-interests"]  // speak more, follow up
  }, function (err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("new report created by advocate form");
    let recordId = record.getId();
    console.log(recordId);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        statusCode: 200,
        message: 'survey submitted',
        record: record.getId()
      })
    });
  });
}
