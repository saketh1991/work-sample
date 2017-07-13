const APP_CONFIG: any = {
  datamover: {
    configuration: {
      td_product_id: 'td_dm_1st_edition',
      system_type: 'datamover',
      system_name: 'a datamover application',
    },
    instances: {
      count: 1,
      type: 'm4.xlarge',
    },
  },
  em: {
    configuration: {
      td_product_id: 'td_em_1st_edition',
      system_type: 'ecosystemmanager',
      system_name: 'a ecosystem manager application',
    },
    instances: {
      count: 1,
      type: 'm4.2xlarge',
    },
  },
  dsu: {
    configuration: {
      td_product_id: 'td_dsc_1st_edition',
      system_type: 'dsc',
      system_name: 'a dsc application',
    },
    instances: {
      count: 1,
      type: 'm4.2xlarge',
    },
  },
  vp: {
    configuration: {
      td_product_id: 'td_vp_1st_edition',
      system_type: 'viewpoint',
      system_name: 'a view point application',
    },
    instances: {
      count: 1,
      type: 'm4.2xlarge',
    },
  },
  rest: {
    configuration: {
      td_product_id: 'td_rest_1st_edition',
      system_type: 'rest',
      system_name: 'a rest application',
    },
    instances: {
      count: 1,
      type: 't2.large',
    },
  },
  cmic: {
    configuration: {
      td_product_id: 'td_sm_1st_edition',
      system_type: 'servermanagement',
      system_name: 'a servermanagement application',
    },
    instances: {
      count: 1,
      type: 'm4.xlarge',
    },
  },
};

const PRODUCT_TYPES: any = {
  td_dm_1st_edition: 'datamover',
  td_em_1st_edition: 'em',
  td_dsc_1st_edition: 'dsu',
  td_vp_1st_edition: 'vp',
  td_rest_1st_edition: 'rest',
  td_sm_1st_edition: 'cmic',
};

export { APP_CONFIG, PRODUCT_TYPES };
