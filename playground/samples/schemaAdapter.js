const adapterTypeMappings = {
  DynamicList: {
    type: "string",
    format: "list-select",
  },
  Number: {
    type: "number",
  },
  String: {
    type: "string",
  },
  Text: {
    type: "string",
    format: "text",
  },
  Object: {
    type: "object",
  },
  Array: {
    type: "array",
  },
  File: {
    type: "string",
    format: "data-url",
  },
  "File[]": {
    type: "array",
    items: {
      type: "string",
      format: "data-url",
    },
  },
  Date: {
    type: "string",
    format: "date",
  },
  DateTime: {
    type: "string",
    format: "date-time",
  },
  Boolean: {
    type: "boolean",
  },
  Mixed: {
    type: "object",
  },
  ObjectID: {
    type: "string",
  },
  LookupObjectID: {
    type: "string",
    format: "lookup-object",
  },
  "String[]": {
    type: "array",
    items: {
      type: "string",
    },
  },
  "Date[]": {
    type: "array",
    items: {
      type: "string",
      format: "date",
    },
  },
  "DateTime[]": {
    type: "array",
    items: {
      type: "string",
      format: "date-time",
    },
  },
  "Number[]": {
    type: "array",
    items: {
      type: "number",
    },
  },
  "Boolean[]": {
    type: "array",
    items: {
      type: "boolean",
    },
  },
  "Mixed[]": {
    type: "array",
    items: {
      type: "object",
    },
  },
  "Object[]": {
    type: "array",
    items: {
      type: "object",
    },
  },
  "ObjectID[]": {
    type: "array",
    items: {
      type: "string",
    },
  },
  "LookupObjectID[]": {
    type: "array",
    items: {
      type: "string",
      format: "lookup-select",
    },
  },
  Image: {
    type: "string",
    format: "data-url:image",
  },
  Video: {
    type: "string",
    format: "data-url:video",
  },
  Audio: {
    type: "string",
    format: "data-url:audio",
  },
  "Image[]": {
    type: "array",
    items: {
      type: "string",
      format: "data-url:image",
    },
  },
  "Video[]": {
    type: "array",
    items: {
      type: "string",
      format: "data-url:video",
    },
  },
  "Audio[]": {
    type: "array",
    items: {
      type: "string",
      format: "data-url:audio",
    },
  },
};

export const adaptSchema = schema => {
  const { fields } = schema;

  const returnable = {};

  Object.keys(fields).forEach(fieldName => {
    const field = fields[fieldName];

    if (!field.showInForm) {
      return;
    }

    returnable[fieldName] = {
      title: field.fullName,
      ...adapterTypeMappings[field.type],
    };

    if (field.required !== undefined) {
      returnable[fieldName].required = field.required;
    }

    if (field.show !== undefined) {
      returnable[fieldName].show = field.show;
    }

    if (field.list !== undefined) {
      returnable[fieldName].list = field.list;
      returnable[fieldName].format = "list-select";
    }

    if (field.fields) {
      switch (adapterTypeMappings[field.type].type) {
        case "array":
          returnable[fieldName].items = {
            type: "object",
            properties: adaptSchema(field),
          };
          break;
        case "object":
          returnable[fieldName].properties = adaptSchema(field);
          break;
      }
    }
  });

  console.log(returnable);

  return returnable;
};
