import { Tabs } from 'antd';

const DetailsTab = () => {
    return (
        <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Details" key="1">
          <p>Product details go here...</p>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Reviews" key="2">
          <div>
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-medium">Helen M.</p>
                <p>
                  Excellent running shoes. It turns very sharply on the
                  foot.
                </p>
              </div>
              <div>
                <p className="font-medium">Ann D.</p>
                <p>Good shoes</p>
              </div>
              <div>
                <p className="font-medium">Andrew G.</p>
                <p>Is it suitable for running?</p>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Discussion" key="3">
          <p>Discussion content goes here...</p>
        </Tabs.TabPane>
      </Tabs>
    );
};

export default DetailsTab;