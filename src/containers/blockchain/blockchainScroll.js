import React, { useState } from "react";
import Block from "./block"; // Adjust the import path as necessary
import { Container, Row } from "reactstrap";

const BlockchainScrollContainer = ({ blocks, state }) => {
  return (
    <>
      <div
        ref={state.blockchainScrollContainer}
        className="is-flex"
        style={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          paddingBottom: "5rem",
        }}
      >
        <div style={{ marginLeft: "2rem" }}></div>
        <Container
          style={{
            display: "flex",
          }}
        >
          <Row
            style={{
              display: "ruby",
            }}
          >
            {blocks.map((block, index) => (
              <div
                style={{
                  width: "20%",
                }}
                className="block"
              >
                <Block
                  key={index}
                  block={block}
                  state={state}
                  setAsLast={() => console.log("Set as last block")}
                />
              </div>
            ))}
          </Row>
        </Container>
        <div
          className="is-hidden-mobile"
          style={{ marginLeft: "20rem", opacity: 0 }}
        >
          0
        </div>
        <div
          className="is-hidden-tablet"
          style={{ marginLeft: "2rem", opacity: 0 }}
        >
          0
        </div>

        {state.fullChain.length > 0 && (
          <>
            <div
              className="has-shadow is-flex is-hidden-mobile has-background-light"
              style={{
                position: "absolute",
                left: 0,
                width: "2rem",
                height: "5rem",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.8,
              }}
              onClick={() => console.log("Scroll left")}
            >
              <div className="icon">
                <i className="fas fa-angle-double-left"></i>
              </div>
            </div>
            <div
              className="has-shadow is-flex has-background-light"
              style={{
                position: "absolute",
                right: 0,
                width: "2rem",
                height: "5rem",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.8,
              }}
              onClick={() => console.log("Scroll right")}
            >
              <div className="icon">
                <i className="fas fa-angle-double-right"></i>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BlockchainScrollContainer;
