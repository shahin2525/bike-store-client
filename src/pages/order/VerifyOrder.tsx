import { Card, Descriptions, Badge, Button, Spin } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { Link, useSearchParams } from "react-router-dom";
import { useVerifyOrderQuery } from "../../redux/feature/order/orderApi";
const VerifyOrder = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, data } = useVerifyOrderQuery(
    searchParams.get("order_id"),
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const orderData = data?.data?.[0];
  // console.log(orderData);

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Spin size="large" />
    </div>
  ) : (
    <div className="container mx-auto p-4 " style={{ padding: "10px" }}>
      <h1 className="text-3xl font-bold mb-6">Order Verification</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Details */}
        <Card title="Order Details">
          <Descriptions column={1}>
            <Descriptions.Item label="Order ID">
              {orderData?.order_id}
            </Descriptions.Item>
            <Descriptions.Item label="Amount">
              {orderData?.currency} {orderData?.amount?.toFixed(2)}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge
                status={
                  orderData?.bank_status === "Success" ? "success" : "error"
                }
                text={orderData?.bank_status}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {new Date(orderData?.date_time)?.toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Payment Information */}
        <Card title="Payment Information">
          <Descriptions column={1}>
            <Descriptions.Item label="Method">
              {orderData?.method}
            </Descriptions.Item>
            <Descriptions.Item label="Transaction ID">
              {orderData?.bank_trx_id}
            </Descriptions.Item>
            <Descriptions.Item label="Invoice No">
              {orderData?.invoice_no}
            </Descriptions.Item>
            <Descriptions.Item label="SP Code">
              {orderData?.sp_code}
            </Descriptions.Item>
            <Descriptions.Item label="SP Message">
              {orderData?.sp_message}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Customer Information */}
        <Card title="Customer Information">
          <Descriptions column={1}>
            <Descriptions.Item label="Name">
              {orderData?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {orderData?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {orderData?.phone_no}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {orderData?.address}
            </Descriptions.Item>
            <Descriptions.Item label="City">
              {orderData?.city}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Verification Status */}
        <Card title="Verification Status">
          <div className="flex items-center gap-2">
            {orderData?.is_verify === 0 ? (
              <>
                <CheckCircleOutlined
                  style={{ color: "green", fontSize: "20px" }}
                />
                <span>Verified</span>
              </>
            ) : (
              <>
                <ExclamationCircleOutlined
                  style={{ color: "orange", fontSize: "20px" }}
                />
                <span>Not Verified</span>
              </>
            )}
          </div>
          <div className="mt-4">
            <Link to="/order-view">
              <Button type="primary" block>
                View Orders
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VerifyOrder;
