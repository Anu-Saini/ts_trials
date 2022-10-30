
import { Card, Col, Row, Button } from 'antd';
import React from 'react';
const Donate = () => (
  <div className="site-card-wrapper">
    <h1>Please choose the amount to donate!</h1>
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Donate $5" bordered={false}>
          <Button >$5</Button>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Donate $10" bordered={false}>
        <Button >$10</Button>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Donate $15" bordered={false}>
        <Button >$15</Button>
        </Card>
      </Col>
    </Row>
  </div>
);
export default Donate;