import { Breadcrumb } from "antd";

// Dynamic Breadcrumb Component
const DynamicBreadcrumb = ({ items }: { items: { href?: string, title: React.ReactNode }[] }) => {
   
   return (<Breadcrumb>
      {items.map((item, index) => (
        <Breadcrumb.Item key={index} href={item.href}>
          {item.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )};
  export default DynamicBreadcrumb