import { equal } from "assert";

var Ajv = require("ajv");
var ajv = new Ajv();
const sparkSchema = require("../models/spark.json");

export const validateSpark = spark => {
  if (ajv.validate(sparkSchema, spark)) {
    return spark;
  } else return ajv.errors;
};

export const validateSparks = sparks => {
  if (typeof sparks != "array") return [];
  return sparks.filter(s => equal(validateSpark(s), s));
};
