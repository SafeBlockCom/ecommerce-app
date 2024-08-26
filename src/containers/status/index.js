import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cart";
import { CommonLayout } from "../../components";
import { CurrencyContext } from "../../context/Currency/CurrencyContext";
import { HELPER } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { ALERT_ACTIONS, ORDER_ACTIONS } from "../../store/actions";
import { useNavigate, useParams } from "react-router-dom";
import BlockchainScrollContainer from "./blockchainScroll";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";

const Summary = ({ img, title, desc, blocks, state }) => {
  return <BlockchainScrollContainer blocks={blocks} state={state} />;
};

const _blocks = [
  {
    number: 3710,
    timestamp: "6/3/24 22:57:22",
    miner: "Majito",
    head: true,
    isLast: true,
    isLongest: true,
    transactions: [
      {
        sender: { publicKey: "0" },
        receiver: "Majito",
        receiverAddress: "99730cd9a9...",
        amount: 6.25,
      },
    ],
    previousHash:
      "00007f8ab416be290db31b53d2da20d1de2997082e47b3a789fa96469ea863cf",
    nonce: 6760,
    hash: "00009204770d8926a11e2d2666d5213d498ee99266e213d9e25323964aa9386e",
    valid: true,
  },
  {
    number: 3710,
    timestamp: "6/3/24 26:29:22",
    miner: "Majito",
    head: true,
    isLast: true,
    isLongest: true,
    transactions: [
      {
        sender: { publicKey: "0" },
        receiver: "Majito",
        receiverAddress: "99730cd9a9...",
        amount: 6.25,
      },
    ],
    previousHash:
      "00007f8ab416be290db31b53d2da20d1de2997082e47b3a789fa96469ea863cf",
    nonce: 6760,
    hash: "00009204770d8926a11e2d2666d5213d498ee99266e213d9e25323964aa9386e",
    valid: true,
  },
  {
    number: 3710,
    timestamp: "6/3/24 25:57:22",
    miner: "Majito",
    head: true,
    isLast: true,
    isLongest: true,
    transactions: [
      {
        sender: { publicKey: "0" },
        receiver: "Majito",
        receiverAddress: "99730cd9a9...",
        amount: 6.25,
      },
    ],
    previousHash:
      "00007f8ab416be290db31b53d2da20d1de2997082e47b3a789fa96469ea863cf",
    nonce: 6760,
    hash: "00009204770d8926a11e2d2666d5213d498ee99266e213d9e25323964aa9386e",
    valid: true,
  },
  {
    number: 3710,
    timestamp: "6/3/24 32:57:22",
    miner: "Majito",
    head: true,
    isLast: true,
    isLongest: true,
    transactions: [
      {
        sender: { publicKey: "0" },
        receiver: "Majito",
        receiverAddress: "99730cd9a9...",
        amount: 6.25,
      },
    ],
    previousHash:
      "00007f8ab416be290db31b53d2da20d1de2997082e47b3a789fa96469ea863cf",
    nonce: 6760,
    hash: "00009204770d8926a11e2d2666d5213d498ee99266e213d9e25323964aa9386e",
    valid: true,
  },
  // Add more blocks as needed
];
const _block = [
  {
    id: "599e2027-6670-4e21-8104-9852c859cfdd",
    index: 1,
    timestamp: "1724675911582",
    miner: "7f8bd02c-87f8-4459-80bf-f98eaa8eb233",
    previousHash:
      "66b80113c2393ba3ed328e990d05fd8de2f464bef3b29ae32dc30fd6a886d551",
    hash: "0000a8ae8a648d2ac9217f3c5f69bc163434190b22d4e204d0f310e4acfe1767",
    nonce: 4885,
    reward: 3.125,
    successfulMinedTransactions: 34,
    createdAt: "2024-08-26T12:38:34.000Z",
    updatedAt: "2024-08-26T12:38:34.000Z",
    Transactions: [],
  },
  {
    id: "79b77ae3-3796-4298-836b-3471f5937b09",
    index: 1,
    timestamp: "1724677388647",
    miner: "5306dd02-b901-4cc1-bace-0d8177b8d4a9",
    previousHash:
      "ceed6e4f2c90469deaf8b86d0534c8b8074ebab79f27b01a1814ce08c2f7c1ac",
    hash: "0000d49ee0a5ea2300a87f96778a6897931856122d418771358ae05b90ed1440",
    nonce: 40484,
    reward: 3.125,
    successfulMinedTransactions: 1,
    createdAt: "2024-08-26T13:03:10.000Z",
    updatedAt: "2024-08-26T13:03:10.000Z",
    Transactions: [],
  },
  {
    id: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
    index: 2,
    timestamp: "1724676076882",
    miner: "00d76b8d-ba89-4746-904a-a7ebbafcf878",
    previousHash:
      "0000a8ae8a648d2ac9217f3c5f69bc163434190b22d4e204d0f310e4acfe1767",
    hash: "0000c9a9c2a40661f1e7f66e9842df2ce950c9b41be55e52ef04e530cd4b02e1",
    nonce: 825,
    reward: 3.125,
    successfulMinedTransactions: 34,
    createdAt: "2024-08-26T12:41:17.000Z",
    updatedAt: "2024-08-26T12:41:17.000Z",
    Transactions: [
      {
        id: "02494afd-3421-4d9b-9172-aedd1b6f927f",
        identifier: "TX-1724675905960-8964b73b-383f-4418-88b7-a7bd5e4719ae",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 111,
        data: '{"orderId":"d12393a8-aaff-405c-b442-c21411f8c9fa"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:25.000Z",
        updatedAt: "2024-08-26T12:41:17.000Z",
      },
      {
        id: "052347af-2ca5-43b7-a748-7d0bfa3d7e52",
        identifier: "TX-1724675899288-aeab2793-a391-4770-8f5b-6846b6b88edd",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 111,
        data: '{"orderId":"1bdcfe33-e8fe-4e4f-9513-2b7ce867779f"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:19.000Z",
        updatedAt: "2024-08-26T12:41:17.000Z",
      },
      {
        id: "0c42892d-45f9-4fbd-a4dc-edccb69dd56b",
        identifier: "TX-1724675903226-7e7f4380-7868-42d1-b523-88712807ebc5",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 25390,
        data: '{"orderId":"083b83c1-bffc-4021-aa91-d918fdabdee9"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:23.000Z",
        updatedAt: "2024-08-26T12:41:17.000Z",
      },
      {
        id: "0c748e07-fd7b-4015-97f3-626877c22c00",
        identifier: "TX-1724675904872-790ed836-0f7f-465a-ba1d-364b6ec3747c",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 25390,
        data: '{"orderId":"a3d6b1c4-b255-4a30-9c4e-d2da587a5e1b"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:24.000Z",
        updatedAt: "2024-08-26T12:41:17.000Z",
      },
      {
        id: "12fff07f-677a-4f79-88fd-04f64fd16317",
        identifier: "TX-1724675900350-64e3e756-9df0-4eeb-85af-4aac1fb6e252",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 111,
        data: '{"orderId":"b22baf94-39a2-402e-859f-fd76545bd66b"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:20.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "1487e536-b995-4f6c-81e4-7d85c0c35ff0",
        identifier: "TX-1724675893435-dad2cb21-c6bf-46d8-8497-8fbc5ab844b7",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 1000,
        data: '{"orderId":"d8400ee4-ad25-408f-a704-d0ebbcaf8db5"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:13.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "1982b47d-6a3a-4966-ac77-815a4ca6e2d6",
        identifier: "TX-1724675893087-491e66e5-86a2-4085-a6d2-a47b2edc8154",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 2000,
        data: '{"orderId":"5193584b-4291-4305-a62a-4210d0103e00"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:13.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "1bf84090-09bb-49d4-93b2-9717db55bc15",
        identifier: "TX-1724675898945-9bbe19eb-0e51-471a-9bee-6055e0a12842",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 111,
        data: '{"orderId":"55f6ad0a-82a4-4531-9c58-480679c4639c"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:18.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "29b7a210-7d55-4b45-87e5-669413029ebd",
        identifier: "TX-1724675899993-3bfb1798-69e0-45d8-8bee-dd0cbaff114e",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 111,
        data: '{"orderId":"675f9c49-58eb-41a3-a4c2-80682c7966ca"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:19.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "2e0f2639-04d0-405e-81b8-9463f143d57c",
        identifier: "TX-1724675903934-6f8bf689-63bd-4ec5-98bf-fd59411f32ec",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 25390,
        data: '{"orderId":"96c537d1-7ca3-4767-98a1-839b9ef841d8"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:23.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "2f6477e5-a197-4270-a309-ecae262f0e19",
        identifier: "TX-1724675894030-515cb95b-efb4-4e3a-97e4-3fd4f2f4c881",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 1000,
        data: '{"orderId":"b55ac204-c4b6-4120-b2b9-503ccfdb2957"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:14.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "3c4fbc49-22eb-428a-b2b7-c0505811b4a7",
        identifier: "TX-1724675901456-f33fe1c9-460e-4d69-9b46-e61e0d95f5f2",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 111,
        data: '{"orderId":"ac59c305-7db9-4bbf-97c1-5bdf8b912bfe"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:21.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "3cea62e3-7c16-45f0-9dc6-4293d7164280",
        identifier: "TX-1724675896375-4d7bd86e-babe-43fa-8e79-16bd9a2e838c",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 1500,
        data: '{"orderId":"adac5791-cb23-4d60-b04a-5155b3c57733"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:16.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "449514f8-99d9-4db7-a2bb-e4481648c3f0",
        identifier: "TX-1724675905248-eda1973f-15a1-47f1-8a2a-aeb8e47d8bfd",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 25390,
        data: '{"orderId":"742f4fe3-9bbe-4719-b0a1-a13293b4e229"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:25.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "4b71b80d-7f42-4100-af90-6ca5013e0773",
        identifier: "TX-1724675897874-8630ef26-5e25-417e-ade1-c663a67f0de6",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 111,
        data: '{"orderId":"4cced8ff-640d-4e84-81b5-fca1ce3b5ce8"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:17.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "57caa36f-20eb-44db-af9c-f6a788fec59d",
        identifier: "TX-1724675899645-611902dd-a501-4d0f-a3b6-8c02cdd82a2e",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 111,
        data: '{"orderId":"17bfe7c2-c6bc-419f-a700-909be4ac5b00"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:19.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "58ef5cde-eca8-406d-8e29-3ab1e51651df",
        identifier: "TX-1724675904283-1031ad73-25c6-4b45-b400-2eeb7939b1c5",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 25390,
        data: '{"orderId":"7fda4070-b707-4acb-9b31-8d162b4a040c"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:24.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "59fa9b6d-8f79-44d1-824b-e447f2705478",
        identifier: "TX-1724675905607-1fbf6d3e-b0c4-4cb3-8fb5-3243eaaba73a",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 111,
        data: '{"orderId":"6bce3492-1c46-407a-bf34-04a67578d4d5"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:25.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "61b8797d-a9a2-4150-82bb-a87d8eaad327",
        identifier: "TX-1724675901806-eec320fc-b41c-4a7b-a98b-bc2b359383ea",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 111,
        data: '{"orderId":"c9deced6-4305-4e74-a53a-fa203cb6b6d3"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:21.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "6c85198c-57b7-4bbc-a90a-742dcee2f38b",
        identifier: "TX-1724675907059-dae400c6-d94d-4aa6-9ce8-1fa36fe7c6ef",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 1500,
        data: '{"orderId":"ddc8a0e0-45c7-45cb-9eef-224373c3af00"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:27.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "712287ce-bb80-4ab1-b6fe-8e304bbdafcd",
        identifier: "TX-1724675903573-b2db29f0-546b-4aac-ae02-07a2f81eef4e",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 25390,
        data: '{"orderId":"eb60b39a-590a-487d-b6fe-9996fdde0b42"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:23.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "74570426-9796-40b2-8848-816e2a2cace1",
        identifier: "TX-1724675902884-9ebd8467-f64a-4b26-96bb-79c89b6091a9",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 25390,
        data: '{"orderId":"9f1dbfaa-75ce-4975-85fa-15a4878eaab1"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:22.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "7b6d2ade-0f73-4bbd-9d9d-4f955d07df6f",
        identifier: "TX-1724675900706-7056b2e4-2310-43de-99a3-5be897e57c9c",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 111,
        data: '{"orderId":"4311010d-0d81-4602-88ae-4f82878e1792"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:20.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "806206c1-305b-4af8-a65f-56406631541d",
        identifier: "TX-1724675898608-0656b2c1-60a1-43f7-8463-21dfadb53ba2",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 111,
        data: '{"orderId":"98bf28b0-9087-4809-a30d-0b4e7087da2f"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:18.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "875b3b32-f3f5-490a-a11f-048e97600988",
        identifier: "TX-1724675895794-d6ebb11a-f5c5-4947-8d4f-65a5a99b3e00",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 1000,
        data: '{"orderId":"f8ce82eb-27a7-48f7-9ac2-57afd512f0f6"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:15.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "88ddc9d1-fd05-4bdb-a2d9-0d586bac4143",
        identifier: "TX-1724675897294-fbc65788-6a77-4fca-8e22-92212bfb3c4a",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 1500,
        data: '{"orderId":"f5251ba1-1e23-41d5-bd9c-5d9f31734c91"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:17.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "8d3131ea-6bb3-4ea5-93d9-e5ccc4018d8e",
        identifier: "TX-1724675901083-11656ecd-3a16-4bdd-bd99-7df45c63e254",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 111,
        data: '{"orderId":"bf2d465f-879a-4ac7-a7d4-5fcf7f1792de"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:21.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "99426e6e-4fa7-4814-bf57-c1f393e7179e",
        identifier: "TX-1724675896828-6416286c-475a-41fb-bdcc-99e099658e8e",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 1500,
        data: '{"orderId":"deada78c-18bd-4c64-84bd-326be7377df0"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:16.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "9b8179cb-22fb-4df4-b8a5-2f86b36c2e51",
        identifier: "TX-1724675906709-9df2237a-4330-41fb-976c-41bb5c5dec6f",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 1500,
        data: '{"orderId":"f6ab395b-9e03-40bd-9292-aa6a2df105cb"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:26.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "a7969191-44e8-4d05-9141-3838a4d1269a",
        identifier: "TX-1724675898253-f25cd645-f9e8-4b04-9ecd-5c5496a50593",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 111,
        data: '{"orderId":"70176b95-607e-4dd0-adca-0e49206c4a51"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:18.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "b86cfe58-e92d-4946-be0e-31d4e8354807",
        identifier: "TX-1724675902547-dcd3393b-677d-4ac5-9228-67d9edc830c6",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 111,
        data: '{"orderId":"ffb0696e-f011-4664-8a69-1e6556544440"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:22.000Z",
        updatedAt: "2024-08-26T12:41:18.000Z",
      },
      {
        id: "bb45f2c4-8c01-4237-862d-cb998acbef50",
        identifier: "TX-1724675891441-9a480bb4-a225-43f6-b11d-03de62a068ac",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 1500,
        data: '{"orderId":"15a2c770-0a30-483e-92f5-2aaa0ae36858"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:11.000Z",
        updatedAt: "2024-08-26T12:41:19.000Z",
      },
      {
        id: "c35494de-ad90-41eb-9b51-413d1e98547c",
        identifier: "TX-1724675906339-686930de-e1b6-45d3-8710-8916871b3c57",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 1500,
        data: '{"orderId":"fe7c7c90-145f-4d94-a44d-9f3c3e27885f"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:26.000Z",
        updatedAt: "2024-08-26T12:41:19.000Z",
      },
      {
        id: "d5d859ac-7ad6-45f7-8637-7247d7688413",
        identifier: "TX-1724675902185-f7ce6211-e275-4aa3-95f5-ecd964de16ae",
        type: "order",
        sender: "Sara Hasan",
        recipient: "144879bc-cb61-46b8-b947-2cbe175489cd",
        amount: 111,
        data: '{"orderId":"1a621614-decc-4fb1-9bd1-887efc64a195"}',
        blockId: "fffa45a6-e3e6-4e6f-aa64-a6fe40374a82",
        createdAt: "2024-08-26T12:38:22.000Z",
        updatedAt: "2024-08-26T12:41:19.000Z",
      },
    ],
  },
  {
    id: "e2725a82-7255-4b29-90d5-67c98fda47b2",
    index: 3,
    timestamp: "1724676193214",
    miner: "00d76b8d-ba89-4746-904a-a7ebbafcf878",
    previousHash:
      "0000c9a9c2a40661f1e7f66e9842df2ce950c9b41be55e52ef04e530cd4b02e1",
    hash: "000057e77bac66bdb8edb1f785b9825c964df92639691d227c2c73e5cf701f13",
    nonce: 125843,
    reward: 3.125,
    successfulMinedTransactions: 1,
    createdAt: "2024-08-26T12:43:18.000Z",
    updatedAt: "2024-08-26T12:43:18.000Z",
    Transactions: [
      {
        id: "ef8b4017-b393-499e-a3fa-52f5b1ddb77e",
        identifier: "TX-1724676183657-28145e22-0fa2-47dc-be6c-5aae947fb57b",
        type: "order",
        sender: "Sara's Closet",
        recipient: "17bfe7c2-c6bc-419f-a700-909be4ac5b00",
        amount: 111,
        data: '{"orderId":"40ba1420-49b9-48eb-8f65-02c5646fa805"}',
        blockId: "e2725a82-7255-4b29-90d5-67c98fda47b2",
        createdAt: "2024-08-26T12:43:03.000Z",
        updatedAt: "2024-08-26T12:43:18.000Z",
      },
    ],
  },
];

const state = {
  privateKey: "some-private-key",
  blockchainScrollContainer: React.createRef(),
  fullChain: _block,
  // fullChain: [
  //   /* array of blocks */
  // ],
};

const OrderStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ref } = useParams(); // This will get the value of the `ref` URL parameter

  const { order, order_ref } = useSelector((state) => state.order);
  const [blocks, setBlocks] = useState([]);

  const cartContext = useContext(CartContext);
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.selectedCurr.symbol;

  useEffect(() => {
    try {
      dispatch(
        ORDER_ACTIONS.ORDER_STATUS(HELPER.isNotEmpty(ref) ? ref : order_ref)
      );
    } catch (error) {
      // Code that runs if an error occurs
      console.error("An error occurred:", error.message);
    }
    cartContext.resetCart();

    // Fetch blocks initially
    fetchBlocks();

    // Set up an interval to fetch blocks every minute
    const intervalId = setInterval(() => {
      fetchBlocks();
    }, 60000); // 60000ms = 1 minute

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to fetch blocks from the API
  const fetchBlocks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/blockchain"); // Replace with your actual API endpoint
      if (response.status == 200) {
        setBlocks(response.data.data); // Assuming response.data contains the array of blocks
      } else {
        dispatch(
          ALERT_ACTIONS.error("There is an issue while loading blockchain")
        );
      }
    } catch (error) {
      console.error("Error fetching blocks:", error);
    }
  };

  // useEffect(() => {
  //   console.log("blocks: ", blocks);
  // }, [blocks]);
  return (
    <CommonLayout>
      <section className="section-b-space light-layout white-1">
        <Container>
          <Row>
            <Col md="12">
              <div className="success-text">
                <i className="fa fa-check-circle" aria-hidden="true"></i>
                <h2>thank you</h2>
                <p>
                  Payment is successfully processsed and your order is on the
                  way
                </p>
                <p>Transaction ID:{order?.order?.order_id}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-b-space">
        <Container>
          <Row>
            <Col lg="6">
              <Row className="order-success-sec">
                <Col sm="12">
                  <h4>summery</h4>
                  <ul className="order-detail">
                    <li>
                      <h6>order ID:</h6> &nbsp; {order?.order?.order_id}
                    </li>
                    <li>
                      <h6>Order Date:</h6> &nbsp; {order?.order?.created_at}
                    </li>
                    <li>
                      <h6>Order Total: </h6> &nbsp;{" "}
                      {`${symbol} ${order?.order?.total_amount}`}
                    </li>
                  </ul>
                </Col>
                <Col sm="12">
                  <h4>shipping address</h4>
                  <ul className="order-detail">
                    <li>
                      <h6>Name: </h6>{" "}
                      {`${order?.billing_details?.f_name} ${order?.billing_details?.l_name}`}
                    </li>
                    <li>
                      <h6>Email: </h6> {order?.billing_details?.email}
                    </li>
                    <li>
                      {" "}
                      <h6>Address: </h6>
                      {order?.billing_details?.address}
                    </li>
                    <li>
                      {order?.billing_details?.country},{" "}
                      {order?.billing_details?.state},{" "}
                      {order?.billing_details?.city},{" "}
                      {order?.billing_details?.postal_code}
                    </li>
                    <li>Contact No. {order?.billing_details?.phone_number}</li>
                  </ul>
                </Col>
                <Col sm="12" className="payment-mode">
                  <h4>payment method</h4>
                  <p>Paid by {order?.order?.payment_method}</p>
                </Col>
              </Row>
            </Col>
            <Col lg="6">
              <div className="product-order">
                <h3>your order details</h3>

                {/* {cartItems.map((item, i) => (
                  <Row className="product-order-detail" key={i}>
                    <Col xs="3">
                      <Media
                        src={item.images[0].src}
                        alt=""
                        className="img-fluid blur-up lazyload"
                      />
                    </Col>
                    <Col xs="3" className="order_detail">
                      <div>
                        <h4>product name</h4>
                        <h5>{item.title}</h5>
                      </div>
                    </Col>
                    <Col xs="3" className="order_detail">
                      <div>
                        <h4>quantity</h4>
                        <h5>{item.qty}</h5>
                      </div>
                    </Col>
                    <Col xs="3" className="order_detail">
                      <div>
                        <h4>price</h4>
                        <h5>
                          {symbol}
                          {item.price}
                        </h5>
                      </div>
                    </Col>
                  </Row>
                ))} */}
                <div className="total-sec">
                  <ul>
                    <li>
                      subtotal{" "}
                      <span>{`${symbol} ${order?.order?.sub_total_amount}`}</span>
                    </li>
                    <li>
                      shipping{" "}
                      <span>{`${symbol} ${order?.order?.shipment_charges}`}</span>
                    </li>
                    <li>
                      Discount{" "}
                      <span>
                        {" "}
                        - {`${symbol} ${order?.order?.discount_amount}`}
                      </span>
                    </li>
                    <li>
                      total{" "}
                      <span>{`${symbol} ${order?.order?.total_amount}`}</span>
                    </li>
                  </ul>
                </div>
                <div className="final-total">
                  <h3>
                    total{" "}
                    <span>{`${symbol} ${order?.order?.total_amount}`}</span>
                  </h3>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section-b-space">
        <Container>
          <Row>
            <Col lg="12">
              <div className="product-order">
                <h3>View blockchain</h3>

                <section className="dashboard-section section-b-space">
                  <Container>
                    <Row>
                      <Col lg="12">
                        <div className="dashboard-sidebar">
                          <div className="faq-content">
                            <div className="counter-section">
                              <Row>
                                <Summary blocks={blocks} state={state} />
                              </Row>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </section>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default OrderStatus;
