import BreadCrumb from '../modules/allPages/BreadCrumb'
import FilterPart from '../modules/CategoryPage/filterPart'
import ProductList from '../modules/CategoryPage/ProductList'
import SideBar from '../modules/CategoryPage/SideBar'
import env, { findAddress, siteApi } from '../env'
import SimpleFetch from '../components/simpleFetch'
import LoadMore from '../modules/etc/loadmore'
import CatBanner from '../modules/CategoryPage/CatBanner'
import { useEffect, useState } from 'react'
import PackageSlider from '../modules/allPages/PackageSlider'
import SimpleAuth from '../components/simpleAuth'

function Category() {
  const urlSplit = window.location.pathname.split('/')[2]
  var brandName = urlSplit[1] === 'brand' ? urlSplit[2] : ''
  var oilBrandName = urlSplit[1] === 'oil-brand' ? urlSplit[2] : ''
  //console.log(brandName)
  const [catData, setCatData] = useState()
  const [products, setProducts] = useState()
  const [parentName, setParentName] = useState()
  const [catName, setCatName] = useState()
  const [brandId, setBrandId] = useState()
 
  var catEName = ''
  useEffect(() => {
    const packageBody = {
      filter: [],
      category: urlSplit,
      brands: [],
      search_text: '',
      max_price: '',
      sortby: '',
      page: '',
    }
    const postOptions = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(packageBody),
    }
    console.log(postOptions)
    fetch(siteApi + env.productListApi, postOptions)
      .then((res) => res.json())
      .then((result) => {
        setCatData( result.catData)
        setProducts( result)
      })

    //console.log(catData.categories[2].get_child,catName)
  }, [])
  
  const url = document.location.href
  var filterParams = new URL(url)
  const pathName = document.location.pathname
  const catPath = findAddress(document.location.pathname)
  const searchPhrase = filterParams.searchParams.get('search')
  const filters = filterParams.searchParams.get('filter')
  const brands = brandId ? brandId : filterParams.searchParams.get('brands')

  const price = filterParams.searchParams.get('max_price')
  const sortby = filterParams.searchParams.get('sortby')
  //const [reload,setReload]= useState(0);
  //if(categories)
  catEName = pathName.split('/')[2] ? pathName.split('/')[2] : ''

  const productQuery = `{
        "filter":[${filters !== null ? filters : ''}],
        "category":"${brandName ? '' : oilBrandName ? 'motor-oil' : catEName}",
        "brands":[${brands !== null ? brands : ''}],
        "search_text":"${searchPhrase !== null ? searchPhrase : ''}",
        "max_price":"${price !== null ? price : ''}",
        "sortby":"${sortby !== null ? sortby : '25'}",
        "page":${filterParams.searchParams.get('page')}
    }`

  return (
    <>
      {catData && (
        <>
          {catData.imageUrl && (
            <CatBanner
              sliderBanner={catData.imageUrl}
              catEName={catData.link}
              page={1}
              cats={2}
            />
          )}
          <main>
            {parentName && (
              <BreadCrumb
                pName={catName && catName}
                pCat='محصولات /'
                catUrl={'/category-landing/' + parentName}
              />
            )}
            {catEName === 'motor-oil' && (
              <BreadCrumb
                pName={catName && catName}
                pCat='محصولات /'
                catUrl={'/category/motor-oil'}
              />
            )}
            <div className='packagePart'>
              {catData.categories && (
                <FilterPart
                  catName={catData.categories}
                  catId={catPath}
                  productQuery={JSON.parse(productQuery)}
                />
              )}
              <div className='package'></div>
            </div>
            <div className='categoryHolder'>
              <div className='categorySide'>
                {catData.categories && (
                  <SideBar
                    productQuery={JSON.parse(productQuery)}
                    catId={pathName.split('/')[2]}
                    filters={catData.filtersSideBar}
                    categories={catData.categories}
                    brands={catData.brands}
                  />
                )}
              </div>
              <div className='categoryMain'>
                {catData.packageList && 0&&(
                  <PackageSlider data={catData.packageList.product.data} />
                )}
                
                <ProductList
                  products={products}
                  catName={catPath}
                />
              </div>
            </div>
            <LoadMore
              catDetail={catData}
            />
          </main>
        </>
      )}
    </>
  )
}
export default Category
