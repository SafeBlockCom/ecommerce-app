import React, { useState, useContext } from "react";
import { Collapse, Input } from "reactstrap";
import { FilterContext } from "../../../context/filter/FilterProvider";
import { HELPER } from "../../../utils";
import { useSelector } from "react-redux";

const Size = () => {
  const { size } = useSelector((state) => state.products);

  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(FilterContext);
  const { isChecked, selectedSize, handleSizes } = context;

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title" onClick={toggle}>
        size
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-size-filter">
            {HELPER.isNotEmpty(size) &&
              Object.keys(size).map((val, key) => {
                return (
                  <div
                    key={`sizechart-${key}`}
                    className="form-check custom-checkbox collection-filter-checkbox"
                  >
                    <Input
                      checked={
                        HELPER.isNotEmpty(selectedSize)
                          ? selectedSize.includes(size[val]?.value)
                          : false
                      }
                      onChange={() => {
                        handleSizes(size[val]?.value, isChecked);
                      }}
                      type="checkbox"
                      className="custom-control-input"
                      id={size[val]?.option_id}
                    />

                    <label
                      className="custom-control-label"
                      htmlFor={`size-`.key}
                    >
                      {size[val]?.label}
                    </label>
                  </div>
                );
              })}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Size;
