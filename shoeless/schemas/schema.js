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
import specialBanner from "./specialBanner";
import introBanner from "./introBanner";
import specialCollection from "./specialCollection";
import contact from "./contact"

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([contact, specialCollection, specialBanner, newProduct, banner, featureBanner, product, puma, nike, adidas, sketchers, introBanner]),
})

