# Atlas
Simple survey project


## Servicio único API
Post to send data 
Get form list data
https://survey.duckduck.wyracocha.com

## Model básico
```js
'use strict'
const Mongoose = require('mongoose')
const Schema = new Mongoose.Schema({
  info: {
    fullname: String,
    products: [String],
    location: {
      province: String,
      district: String
    },
    isVUCE: {
      type: Boolean,
      default: false
    },
    denomination: String
  },
  q_01: { // ¿Cómo calificaría la Usabilidad de la plataforma?
    type: String,
    required: true
  },
  q_02_01: { // ¿Cómo calificaría el impacto de la VUCE es los siguientes aspectos?
    type: String,
    required: true
  },
  q_02_02: { // ¿Cómo calificaría el impacto de la VUCE es los siguientes aspectos?
    type: String,
    required: true
  },
  q_02_03: { // ¿Cómo calificaría el impacto de la VUCE es los siguientes aspectos?
    type: String,
    required: true
  },
  q_02_04: { // ¿Cómo calificaría el impacto de la VUCE es los siguientes aspectos?
    type: String,
    required: true
  },
  q_02_05: { // ¿Cómo calificaría el impacto de la VUCE es los siguientes aspectos?
    type: String,
    required: true
  },
  q_03: { // ¿Qué oportunidades de mejora de la plataforma VUCE identifica como usuario? Enumérelas y descríbalas.
    type: [Mongoose.SchemaTypes.Mixed]
  },
  q_04: { // ¿Su empresa, actualmente, contrata a un tercero para realizar el Procedimiento?
    type: String
  },
  q_05: { // Si respondió “SI”, por favor precise qué lo motiva a tercerizar la gestión
    type: String
  },
  q_06: { // ¿La entidad le exige realizar algún Procedimiento no previsto en el tupa o que es ilegal?
    type: String
  },
  q_07: { // Si respondió “SI”, por favor, precise en qué consiste dicho Procedimiento.
    type: String
  },
  q_08: { // ¿La autoridad le exige presentar requisitos que no se encuentran en el TUPA?
    type: String
  },
  q_09: { // Si respondió “SI”, por favor, señale cuáles son dichos requisitos.
    type: String
  },
  q_10: { // ¿Ha identificado en el Procedimiento algún requisito que sea ilegal?
    type: String
  },
  q_11: { //  Si su respuesta es “SI”, por favor explicar la razón.
    type: String
  },
  q_12: { // Indique cuál(es) es(son) el(los) requisito(s), cuyo cumplimiento genera el(los) mayor(es) costo(s) para su empresa.
    type: [Mongoose.SchemaTypes.Mixed]
  },
  q_13: { // ¿Ha identificado algún requisito que no sea indispensable para el objetivo del Procedimiento?
    type: String
  },
  q_14: { // Si es “SI”, precise cuáles son los requisitos y explique por qué no son indispensables.
    type: [Mongoose.SchemaTypes.Mixed]
  },
  q_15: { // ¿Considera que es posible reemplazar algún requisito que cumpla con el objetivo del Procedimiento, por otro menos onerosos para la empresa?
    type: String
  },
  q_16: { //  Si es “SI”, indique cuáles son dichos requisitos
    type: [Mongoose.SchemaTypes.Mixed]
  },
  q_17: { // ¿Considera usted que es viable la eliminación del Procedimiento?
    type: String
  },
  q_18: { // Si respondió “SI”, ha identificado algún mecanismo alternativo que podría reemplazar adecuadamente dicho trámite.
    type: String
  },
  q_19: { // ¿La entidad cumple con los plazos previstos para el Procedimiento para emitir observaciones, documentos resolutivos, etc.?
    type: String
  },
  q_20: { // ¿La entidad es predecible en los criterios usados para sus resoluciones, observaciones o decisiones? Es decir, ¿frente a los mismos hechos, resuelve siempre igual o en forma muy similar?
    type: String
  },
  q_21: { // En caso realice operaciones de importación o exportación, ¿cómo califica el nivel de coordinación y/o sincronización de actividades con la autoridad aduanera?
    type: String
  },
  q_22: { //  En términos generales, ¿cómo calificaría el desempeño de la entidad que tramita el Procedimiento?
    type: String
  },
  q_23: { // ¿Qué oportunidades de mejora puede recomendar para la entidad (por ejemplo, aspectos organizativos de la entidad, gestión o recursos humanos)?
    type: String
  },
  q_24: { // Comentarios adicionales u observaciones:
    type: String
  }
})
module.exports = Mongoose.model('survey', Schema)
```
