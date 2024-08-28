import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import VisitorCuTable from "../modules/visitor/VisitorCuTable";
import OrderTable from "../modules/visitor/OrderTable";
import Paging from "../modules/Components/Paging";
import errortrans from "../translate/error";
import env, { normalPriceCount, normalPriceRound } from "../env";
import tabletrans from "../translate/tables";
import VisitorFilters from "../modules/visitor/VisitorFilters";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CustomerTable from "../modules/visitor/customers/CustomerTable";
const cookies = new Cookies();

function Users(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [content, setContent] = useState("");
  const [Dtable, setDtable] = useState(0);
  const [visitorID, setvisitorID] = useState(0);
  const [filters, setFilters] = useState(getFiltersFromUrl());
  const [loading, setLoading] = useState(0);
  const [SaveD, setSaveD] = useState(0);
  const [VisitorOption,setVisitorOption] = useState()
  const [brandOptions, setBrandOptions] = useState();
  const [sample, setSample] = useState([]);
  const [brands, setBrands] = useState([]);
  const [visitorList, setVisitorList] = useState([]);
  const [customers, setCustomers] = useState([]);
  //console.log(Dtable)
  const token = cookies.get(env.cookieName);
  useEffect(() => {
    setLoading(1);
    const body = {
      // offset:filters.offset?filters.offset:"0",
      offset: filters.offset || "0",

      // pageSize:filters.pageSize?filters.pageSize:"10",
      pageSize: filters.pageSize || "10",

      userId: filters.userId ? filters.userId._id : "",
      manageId: visitorID,
      status: filters.status,
      profile: filters.profile,
      brandId: filters.brand,
      dateFrom: filters.date && filters.date.dateFrom,
      dateTo: filters.date && filters.date.dateTo,
      access: filters.access,
      // manageId: filters.manageId,
    };
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify(body),
    };
    console.log(postOptions);
    fetch(env.siteApi + "/panel/product/report-total", postOptions)
      .then((res) => res.json())
      .then(
        async (result) => {
          if(!result.error){
          setLoading(0);
          setContent("");
          setVisitorOption(result.marketList)
          setTimeout(() => setContent(result), 200);
          // setContent("");
          setBrandOptions(result.brandList);
          handelVisitorInformation(result);
          handlerBrand(result.brandData);
          setCustomers(result.userList);
          // setTimeout(() => setContent(result), 200);
          }
        },
        (error) => {
          setLoading(0);
          console.log(error);
        }
      );
  }, [filters, visitorID]);
  const handelVisitorInformation = (data) => {
    const convertVisitorInfo =
      data &&
      data.marketData.map((item) => {
        return {
          ...item,
          value: item.price,
        };
      });
    setVisitorList(convertVisitorInfo);
  };
  const handlerBrand = (brandsInfo) => {
    const convertPriceToValue =
      brandsInfo &&
      brandsInfo.map((item) => {
        return {
          ...item,
          value: item.price,
        };
      });
    setBrands(convertPriceToValue);
  };
  // Function to get filters from URL
  function getFiltersFromUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    const filters = {};
    for (const [key, value] of searchParams.entries()) {
      filters[key] = value;
    }
    return filters;
  }

  function updateUrlWithFilters(newFilters) {
    const searchParams = new URLSearchParams(window.location.search);
    for (const key in newFilters) {
      if (newFilters[key]) {
        searchParams.set(key, newFilters[key]);
      } else {
        searchParams.delete(key); // Remove the parameter if the value is falsy
      }
    }
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }

  // Function to handle filter changes
  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    updateUrlWithFilters(newFilters);
  }

  const selectedVisitor = (event, pieItemIdentifier, item) => {
    setvisitorID(item.id);
  };
  const selectedSingleBrand = (event, pieItemIdentifier, item) => {
    setFilters((prevState) => ({
      ...prevState,
      brand: item.brandId,
    }));
  };

  return (
    <div className="user discount-page" style={{ direction: direction }}>
      <div className="od-header">
        <div className="od-header-info">
          <div className="od-header-name">
            <p>{tabletrans.analyze[lang]}</p>
          </div>
        </div>
        <div class="search-wrapper">
          <VisitorFilters
            lang={props.lang}
            token={token}
            brandOptions={brandOptions}
            VisitorOption={VisitorOption}
            //setFilters={handleFilterChange}
            options={content.access}
            profiles={content.profilesList}
            currentFilters={filters}
            updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
            setFilters={setFilters}
            visitorid={setvisitorID}
          />
          <div class="total-wrapper">
            <p>قیمت کل:{normalPriceRound(content.totalPrice)}</p>
            <p>تعداد کل:{content.totalCount}</p>
          </div>
        </div>
      </div>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={12} className="wrapper-visitor-chart">
              {brands.length > 0 && (
                <PieChart
                  width={500}
                  height={400}
                  series={[
                    {
                      arcLabel: (item) => `${item.name} `,
                      arcLabelMinAngle: 30,
                      data: brands,
                      innerRadius: 20,
                      outerRadius: 200,
                      paddingAngle: 0,
                      cornerRadius: 10,
                      startAngle: -180,
                      endAngle: 180,
                    },
                  ]}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: "white",
                      fontSize: "12px",
                    },
                  }}
                  slotProps={{
                    legend: { hidden: true },
                  }}
                  onItemClick={(event, pieItemIdentifier, item) =>
                    selectedSingleBrand(event, pieItemIdentifier, item)
                  }
                />
              )}
            </Grid>
            <Grid item xs={12} md={12}>
              <div
                className="list-container visitor-list"
                style={{ width: "100%" }}
              >
                <div className="user-list">
                  {/* <OrderTable lang={props.lang} content={content} /> */}
                  <CustomerTable lang={props.lang} userList={customers} />
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={12} className="wrapper-visitor-chart">
              {/* ${item.username} */}
              {visitorList.length > 0 && (
                <PieChart
                  width={500}
                  height={400}
                  series={[
                    {
                      arcLabel: (item) => `(${item.value})`,
                      arcLabelMinAngle: 30,
                      data: visitorList,
                      innerRadius: 30,
                      outerRadius: 200,
                      paddingAngle: 0,
                      cornerRadius: 10,
                      startAngle: -180,
                      endAngle: 180,
                    },
                  ]}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: "white",
                      fontWeight: "bold",
                      fontSize: "12px",
                    },
                  }}
                  // slotProps={{
                  //   legend: { hidden: true },
                  // }}
                  onItemClick={(event, pieItemIdentifier, item) =>
                    selectedVisitor(event, pieItemIdentifier, item)
                  }
                />
              )}
            </Grid>

            <Grid item xs={12} md={12}>
              <div
                className="list-container visitor-list"
                style={{ width: "100%" }}
              >
                <div className="user-list">
                  <OrderTable lang={props.lang} content={content} />
                </div>
              </div>
              <Paging
                content={content}
                setFilters={setFilters}
                filters={filters}
                lang={props.lang}
                updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* <Box>
        <Grid container spacing={2}>
          
        </Grid>
      </Box> */}


    </div>
  );
}
export default Users;
