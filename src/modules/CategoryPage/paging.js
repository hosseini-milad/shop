import { filterToUrl } from "../../env";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
function Paging(props) {
  const { setFilters, Filters, size } = props;
  const urlParams = new URLSearchParams(window.location.search);
  const initialPage = parseInt(urlParams.get("page")) || 1;
  const handleChange = (event, value) => {
    setFilters((prev) => ({ ...prev, page: value }));
    const url = new URL(window.location);
    url.searchParams.set("page", value);
    window.history.replaceState({}, "", url);
  };
  return (
    <Stack
      spacing={2}
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        direction: "ltr",
        marginTop: "auto",
      }}
    >
      <Pagination
        count={size ? size : 10}
        page={Filters.page || 1}
        shape="rounded"
        onChange={handleChange}
      />
    </Stack>
  );
}
export default Paging;
