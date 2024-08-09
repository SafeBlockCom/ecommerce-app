import React from "react";
import { useSelector } from "react-redux";

const useNativeLoaderHandler = () => {
  const { showPageLoader } = useSelector((state) => state.loading);

  if (showPageLoader) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }
  return <></>;
};

export default useNativeLoaderHandler;
