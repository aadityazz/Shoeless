import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import product from './product';
import banner from './banner';
import featureBanner from './featureBanner'
import newProduct from "./newProduct";
import puma from "./puma";
import nike from "./nike";
import adidas from "./adidas";
import sketchers from "./sketchers";
import introBanner from "./introBanner";

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([ newProduct, banner, featureBanner, product, puma, nike, adidas, sketchers, introBanner]),
})

