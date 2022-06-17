import React from 'react';

import { client } from '../lib/client';
import { SpecialCollection, NewProduct, Product, FooterBanner, SpecialBanner,IntroBanner, FeatureBanner,HeroBanner, Nike, Sketchers, Puma, Adidas } from '../components';

const Home = ({specialCollections, newProducts, products, bannerData, specialBannerData,introBannerData, featureBannerData, nikes, pumas, adidass, sketcherss }) => (
  <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />

    <div className="products-heading">
      <h2>Most selling shoes</h2>
    </div>

    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>

      <div className="products-heading">
          <h2>New Arrivals</h2>
      </div>

      <div className="products-container">
          {newProducts?.map((newProduct) => <NewProduct key={newProduct._id} newProduct={newProduct} />)}
      </div>

      <div className="featured-banner-heading">
          <h2>Shoeless Featured</h2>
      </div>
      <FeatureBanner featureBanner={featureBannerData &&featureBannerData[0]}/>

      <div style={{display:"flex"}}>
          <span>
          <SpecialBanner specialBanner={specialBannerData &&specialBannerData[0]}/>
      </span>
          <span>
           <IntroBanner introBanner={introBannerData &&introBannerData[0]}/>
      </span>
      </div>



      <div className="products-heading">
          <h2>Shop By brands</h2>
      </div>

      <img style={{width:"100%", height:"700px", opacity:"0.8"}} src={"https://media.giphy.com/media/TWdxxbLIJyXHG/giphy.gif"}/>

      <div className="brand-logos">
          <img src="https://raw.githubusercontent.com/aadityazz/ASSETS/main/adidas-logo-png-hd-17.png"/>
          <img src="https://raw.githubusercontent.com/aadityazz/ASSETS/main/SKECHERS_logo.png"/>
          <img src="https://raw.githubusercontent.com/aadityazz/ASSETS/main/Nike-Logo.png"/>
          <img src="https://raw.githubusercontent.com/aadityazz/ASSETS/main/PUMA-Logo-1978.jpg"/>
      </div>

      <div className="products-heading">
          <h2>Puma</h2>
      </div>

      <div className="products-container">
          {pumas?.map((puma) => <Puma key={puma._id} puma={puma} />)}
      </div>

      <div className="products-heading">
          <h2>Adidas</h2>
      </div>

      <div className="products-container">
          {adidass?.map((adidas) => <Adidas key={adidas._id} adidas={adidas} />)}
      </div>

      <div className="products-heading">
          <h2>Sketchers</h2>
      </div>

      <div className="products-container">
          {sketcherss?.map((sketchers) => <Sketchers key={sketchers._id} sketchers={sketchers} />)}
      </div>

      <div className="products-heading">
          <h2>Nike</h2>
      </div>

      <div className="products-container">
          {nikes?.map((nike) => <Nike key={nike._id} nike={nike} />)}
      </div>

      {/*<div className="products-heading">*/}
      {/*    <h2>Special Collection</h2>*/}
      {/*</div>*/}

      {/*/!*<div className="products-container">*!/*/}
      {/*/!*    {specialCollections?.map((specialCollection) => <SpecialCollection key={specialCollection._id} specialCollection={specialCollection} />)}*!/*/}
      {/*/!*</div>*!/*/}

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
);


export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

    const newQuery = '*[_type == "newProduct"]';
    const newProducts = await client.fetch(newQuery);

    const featureBannerQuery = '*[_type == "featureBanner"]';
    const featureBannerData = await client.fetch(featureBannerQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

    const introBannerQuery = '*[_type == "introBanner"]';
    const introBannerData = await client.fetch(introBannerQuery);

    const specialBannerQuery = '*[_type == "specialBanner"]';
    const specialBannerData = await client.fetch(specialBannerQuery);

    const nikeQuery = '*[_type == "nike"]';
    const nikes = await client.fetch(nikeQuery);

    const pumaQuery = '*[_type == "puma"]';
    const pumas = await client.fetch(pumaQuery);

    const specialCollectionQuery = '*[_type == "specialCollection"]';
    const specialCollections = await client.fetch(specialCollectionQuery);

    const adidasQuery = '*[_type == "adidas"]';
    const adidass = await client.fetch(adidasQuery);

    const sketchersQuery = '*[_type == "sketchers"]';
    const sketcherss = await client.fetch(sketchersQuery);

  return {
    props: { specialBannerData,products, newProducts, introBannerData, featureBannerData,bannerData, adidass, sketcherss, specialCollections, pumas, nikes}
  }
}

export default Home;
