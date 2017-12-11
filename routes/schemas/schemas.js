module.exports = {
updateGlissade: {
    "type": "object",
    "required": true,
    "additionalProperties": false,
    "properties": {
      "_id": {
        "type": "string",
        "required": true
      },
      "nom": {
        "type": "string",
        "required": false
      },
      "nom_arr": {
        "type": "string",
        "required": false
      },
      "cle": {
        "type": "string",
        "required": false
      },
      "date_maj": {
        "type": "string",
        "format": "date-time",
        "required": false
      },
      "ouvert": {
        "type": "number",
        "required": false
      },
      "deblaye": {
        "type": "number",
        "required": false
      },
      "condition": {
        "type": "string",
        "required": false
      }
    }
  }
}