import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#000",
            borderRadius: 1,
          },
          components: {
            Button: {
              controlHeight: 42,
              defaultBorderColor: "#000",
              boxShadow: "none",
              controlOutline: "#000",
            },
            Input: {
              controlHeight: 42,
              activeShadow: "none",
              boxShadow: "none",
              colorBorder: "#ccc",
            },
            Select: {
              controlHeight: 42,
              boxShadow: "none",
              colorBorder: "#ccc",
              controlOutline : 'none'
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </div>
  );
}

export default ThemeProvider;
