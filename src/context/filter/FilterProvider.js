import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useDispatch } from "react-redux";
import { HELPER } from "../../utils"; // Adjust this import if needed
import { CATEGORY_ACTIONS, PRODUCT_ACTIONS } from "../../store/actions";
// Create the Filter context
export const FilterContext = createContext({});

export const FilterProvider = ({ children }) => {
  const location = useLocation(); // Hook for accessing current location
  const navigate = useNavigate(); // Hook for programmatically navigating
  const dispatch = useDispatch();

  // Extract query parameters from the current URL
  const searchParams = new URLSearchParams(location.search);

  // Parameters from URL
  const title = searchParams.get("title");
  const parentTitle = searchParams.get("parent");
  const subTitle = searchParams.get("child");
  const brand = searchParams.get("brand");
  const color = searchParams.get("color");
  const standard = searchParams.get("standard");
  const condition = searchParams.get("condition");
  const size = searchParams.get("size");
  const slug = searchParams.get("slug");
  const min = searchParams.get("min");
  const max = searchParams.get("max");

  // Processing parameters
  const sizeParam = HELPER.isNotEmpty(size) ? size.split(",") : [];
  const standardParam = HELPER.isNotEmpty(standard) ? standard.split(",") : [];
  const conditionParam = HELPER.isNotEmpty(condition)
    ? condition.split(",")
    : [];
  const brandParam = HELPER.isNotEmpty(brand) ? brand.split(",") : [];
  const colorParam = HELPER.isNotEmpty(color) ? color.split(",") : [];

  // State management
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState(title || "Shop");
  const [categorySlug, setCategorySlug] = useState(slug || "");
  const [parentCategoryTitle, setParentCategoryTitle] = useState(
    parentTitle || "Home"
  );
  const [subCategoryTitle, setSubCategoryTitle] = useState(subTitle || "");
  const [subCategorySlug, setSubCategorySlug] = useState("");
  const [selectedBrands, setSelectedBrands] = useState(brandParam);
  const [selectedColor, setSelectedColor] = useState(colorParam);
  const [selectedSize, setSelectedSize] = useState(sizeParam);
  const [selectedStandard, setSelectedStandard] = useState(standardParam);
  const [selectedCondition, setSelectedCondition] = useState(conditionParam);
  const [selectedPrice, setSelectedPrice] = useState({
    min: min || 0,
    max: max || "",
  });
  const [sortBy, setSortBy] = useState("newest_arrival");
  const [perPageRecord, setPerPageRecord] = useState(10);
  const [isChecked, setIsChecked] = useState(true);
  const [filterChecked, setFilterChecked] = useState([{}]);

  const handleBrands = (brand, checked) => {
    var index = selectedBrands.indexOf(brand);
    if (index > -1) {
      setIsChecked(!isChecked);
      setFilterChecked([{ brand, checked }]);
      setSelectedBrands(selectedBrands.filter((e) => e !== brand));
    } else {
      setIsChecked(!isChecked);
      setFilterChecked([{ brand, checked }]);
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleSizes = (size, checked) => {
    var index = selectedSize.indexOf(size);
    if (index > -1) {
      setIsChecked(!isChecked);
      setFilterChecked([{ size, checked }]);
      setSelectedSize(selectedSize.filter((e) => e !== size));
    } else {
      setIsChecked(!isChecked);
      setFilterChecked([{ size, checked }]);
      setSelectedSize([...selectedSize, size]);
    }
  };
  const handleSelectedStandard = (standard, checked) => {
    var index = selectedStandard.indexOf(standard);
    if (index > -1) {
      setIsChecked(!isChecked);
      setFilterChecked([{ standard, checked }]);
      setSelectedStandard(selectedStandard.filter((e) => e !== standard));
    } else {
      setIsChecked(!isChecked);
      setFilterChecked([{ standard, checked }]);
      setSelectedStandard([...selectedStandard, standard]);
    }
  };
  const handleSelectedCondition = (condition, checked) => {
    var index = selectedCondition.indexOf(condition);
    if (index > -1) {
      setIsChecked(!isChecked);
      setFilterChecked([{ condition, checked }]);
      setSelectedCondition(selectedCondition.filter((e) => e !== condition));
    } else {
      setIsChecked(!isChecked);
      setFilterChecked([{ condition, checked }]);
      setSelectedCondition([...selectedCondition, condition]);
    }
  };
  const handleSelectedColor = (color, checked) => {
    var index = selectedColor.indexOf(color);
    if (index > -1) {
      setIsChecked(!isChecked);
      setFilterChecked([{ color, checked }]);
      setSelectedColor(selectedColor.filter((e) => e !== color));
    } else {
      setIsChecked(!isChecked);
      setFilterChecked([{ color, checked }]);
      setSelectedColor([...selectedColor, color]);
    }
  };

  const getFilters = () => {
    return {
      filters: {
        records_range: { show_count: perPageRecord },
        price_range: { min: selectedPrice?.min, max: selectedPrice?.max },
        sort_by: {
          newest_arrival: sortBy === "newest_arrival" ? 1 : 0,
          featured: sortBy === "featured" ? 1 : 0,
          price_high_to_low: sortBy === "price_high_to_low" ? 1 : 0,
          price_low_to_high: sortBy === "price_low_to_high" ? 1 : 0,
        },
        categories: categorySlug,
        brands: selectedBrands,
        condition: selectedCondition,
        size: selectedSize,
        standard: selectedStandard,
        color: selectedColor,
      },
    };
  };

  useEffect(() => {
    try {
      if (HELPER.isNotEmpty(categorySlug) && categorySlug !== "") {
        dispatch(
          CATEGORY_ACTIONS.GET_CATEGORY_PRODUCT_ITEMS(
            categorySlug,
            getFilters()
          )
        );
      } else if (HELPER.isEmpty(categoryTitle) && categorySlug !== "") {
        dispatch(PRODUCT_ACTIONS.GET_ALL_PRODUCT_LIST());
      }
    } catch (error) {
      // Code that runs if an error occurs
      console.error("An error occurred:", error.message);
    }
  }, []);

  useEffect(() => {
    try {
      if (HELPER.isNotEmpty(categorySlug)) {
        dispatch(
          CATEGORY_ACTIONS.GET_CATEGORY_PRODUCT_ITEMS(
            categorySlug,
            getFilters()
          )
        );
      }
    } catch (error) {
      // Code that runs if an error occurs
      console.error("An error occurred:", error.message);
    }
  }, [categorySlug]);

  // useEffect(() => {
  //   if(HELPER.isNotEmpty(categorySlug)) {
  //     dispatch(CATEGORY_ACTIONS.GET_CATEGORY_PRODUCT_ITEMS(categorySlug))
  //   }
  // }, [categorySlug]);

  useEffect(() => {
    const title = searchParams.get("title");
    const parentTitle = searchParams.get("parent");
    const subTitle = searchParams.get("child");
    const brand = searchParams.get("brand");
    const color = searchParams.get("color");
    const standard = searchParams.get("standard");
    const condition = searchParams.get("condition");
    const size = searchParams.get("size");
    const slug = searchParams.get("slug");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    if (HELPER.isNotEmpty(title)) {
      setSelectedBrands(HELPER.isNotEmpty(brand) ? brand : "");
      setSelectedColor(HELPER.isNotEmpty(color) ? color : "");
      // setSelectedPrice(HELPER.isNotEmpty(price) ? price : "");
      setCategorySlug(HELPER.isNotEmpty(slug) ? slug : "");
      setCategoryTitle(HELPER.isNotEmpty(title) ? title : "");
      setParentCategoryTitle(HELPER.isNotEmpty(parentTitle) ? parentTitle : "");
      setSubCategoryTitle(HELPER.isNotEmpty(subTitle) ? subTitle : "");
      setSelectedSize(HELPER.isNotEmpty(size) ? size : "");
    }
  }, [searchParams]);

  useEffect(() => {
    // navigate(
    //   // `${ROUTE_CONSTANTS.SHOP}?slug=${categorySlug}&child=${subCategorySlug}&brand=${selectedBrands}&condition=${selectedCondition}&standard=${selectedStandard}&color=${selectedColor}&size=${selectedSize}&minPrice=${selectedPrice?.min}&maxPrice=${selectedPrice?.max}`
    // );
  }, [
    categorySlug,
    subCategorySlug,
    selectedBrands,
    selectedColor,
    selectedCondition,
    selectedStandard,
    selectedSize,
    selectedPrice?.min,
    selectedPrice?.max,
  ]);

  //

  return (
    <FilterContext.Provider
      value={{
        title: categoryTitle,
        setCategoryTitle,
        state: categorySlug,
        slug: categorySlug,
        setCategorySlug,
        selectedCategories,
        setSelectedCategories,
        subCategorySlug,
        setSubCategorySlug,
        parentCategoryTitle: parentCategoryTitle,
        setParentCategoryTitle,
        subCategoryTitle: subCategoryTitle,
        setSubCategoryTitle,
        selectedColor,
        setSelectedColor,
        handleColor: handleSelectedColor,
        selectedBrands,
        setSelectedBrands,
        selectedPrice,
        setSelectedPrice,
        isChecked,
        filterChecked,
        selectedSize,
        setSelectedSize,
        selectedStandard,
        setSelectedStandard,
        selectedCondition,
        setSelectedCondition,
        sortBy,
        setSortBy,
        perPageRecord,
        setPerPageRecord,
        handleBrands: handleBrands,
        handleSizes: handleSizes,
        handleStandard: handleSelectedStandard,
        handleCondition: handleSelectedCondition,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
