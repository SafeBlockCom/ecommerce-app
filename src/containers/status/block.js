import React from "react";

const Block = ({ block, state, setAsLast }) => {
  return (
    <div
      className="has-shadow is-flex block-width"
      style={{
        margin: "0.5rem",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div>
        <div className="hero is-primary is-small">
          <div
            className="hero-body has-tri1"
            style={{
              padding: "1rem 0.75rem 2rem 0.75rem",
              position: "relative",
            }}
          >
            <div>
              <h1 className="is-size-5">
                <span className="has-text-weight-semibold">
                  Block {block.number}
                </span>
                <span className="is-size-8">{block.timestamp}</span>
              </h1>
              <h2 className="subtitle">
                Miner:{" "}
                <span className="has-text-weight-semibold">{block.miner}</span>
              </h2>
            </div>

            {state.privateKey && block.head && block.isLast && (
              <div
                className="button is-info has-shadow is-size-8"
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  padding: "0.25rem 0.5rem",
                }}
              >
                <div>Mining based on this Block</div>
              </div>
            )}

            {block.head && !block.isLast && (
              <div
                onClick={() => setAsLast(block)}
                className="button is-light has-shadow is-size-8"
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  padding: "0.25rem 0.5rem",
                }}
              >
                Reset as 'Last Block'
              </div>
            )}

            {block.isLongest && (
              <div
                className="has-background-success has-shadow is-size-8"
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  padding: "0.25rem 0.5rem",
                }}
              >
                longest chain
              </div>
            )}

            {state.privateKey && !block.head && !block.isLast && (
              <div
                onClick={() => setAsLast(block)}
                className="button is-light has-shadow is-size-8"
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  padding: "0.25rem 0.5rem",
                  height: "auto",
                  flexDirection: "column",
                }}
              >
                <div>Set as 'Last Block'</div>
                <div className="is-hidden-mobile" style={{ fontSize: "8px" }}>
                  (only if you know what you do)
                </div>
              </div>
            )}

            {!block.head && block.isLast && (
              <div
                className="button is-info has-shadow is-size-7"
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  padding: "0.25rem 0.5rem",
                }}
              >
                Mining based on this Block
              </div>
            )}
          </div>
        </div>

        <p
          className="has-text-centered is-size-7"
          style={{ padding: "0.25rem", borderBottom: "1px solid lightgrey" }}
        >
          {block.transactions.length}
          {block.transactions.length === 1 ? " Transaction" : " Transactions"}
        </p>

        <div
          className="field"
          style={{ margin: 0, flexGrow: 1, height: "159px", overflowY: "auto" }}
        >
          {block.transactions.length > 0 ? (
            <table
              className="table is-hoverable is-fullwidth"
              style={{ margin: 0 }}
            >
              <tbody className="has-text-weight-semibold has-text-grey">
                {block.transactions.map((t, index) => (
                  <tr key={index} style={{ padding: "0.5rem 0" }}>
                    <td>
                      {t.sender.publicKey === "0" ? (
                        <>
                          <div>New</div>
                          <div className="is-size-7 has-text-weight-normal">
                            Block Reward
                          </div>
                        </>
                      ) : (
                        <>
                          <div>coinbase</div>
                          <div className="is-size-7 has-text-weight-normal">
                            ...
                          </div>
                        </>
                      )}
                    </td>
                    <td
                      className="has-text-info is-paddingless"
                      style={{ verticalAlign: "middle" }}
                    >
                      <i className="fas fa-long-arrow-alt-right"></i>
                    </td>
                    <td>
                      <div>{t.receiver}</div>
                      <div className="is-size-7 has-text-weight-normal">
                        {t.receiverAddress}
                      </div>
                    </td>
                    <td className="has-text-weight-semibold has-text-right">
                      <div>{t.amount}</div>
                      <div className="is-size-7 has-text-weight-normal">
                        BTC
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="label is-small has-text-weight-normal">
              No transactions
            </p>
          )}
        </div>

        <div className="p-75" style={{ borderTop: "1px solid lightgrey" }}>
          <p className="is-size-7">Hash of the previous Block</p>
          <p className="is-size-8 is-ellipsis has-text-dark">
            {block.previousHash}
          </p>
        </div>

        <div
          style={{
            padding: "0.5rem 0.75rem 0.75rem 0.75rem",
            borderTopWidth: "3px",
            borderTopStyle: "solid",
          }}
          className="field has-border-success"
        >
          <p
            className="is-size-8 has-text-dark"
            style={{ marginBottom: "0.25rem" }}
          >
            Nonce: {block.nonce}
          </p>
          <p className="title is-size-7">Hash</p>
          <p className="subtitle is-ellipsis is-size-8">{block.hash}</p>
        </div>
      </div>

      {!block.valid && (
        <div
          className="has-text-danger is-flex has-text-weight-semibold"
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            pointerEvents: "none",
          }}
        >
          {block.invalidChain && <div>Previous blocks invalid</div>}
          {block.invalidHash && <div>Hash invalid</div>}
          {block.invalidSignatures && (
            <div>Transactions with invalid signatures</div>
          )}
          {block.balanceInvalid && (
            <div>Transactions with insufficient balance</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Block;
