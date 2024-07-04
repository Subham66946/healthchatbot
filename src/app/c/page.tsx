"use client";
import {
  FormControl,
  InputLabel,
  FormHelperText,
  Divider,
  Button,
  Input,
  Paper,
} from "@mui/material";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { GetResponse } from "@/services/search";
import SendIcon from "@mui/icons-material/Send";
import { Spin } from "antd";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";

export default function Page() {
  const router=useRouter();
  const { setAuthUser, user, setUser } = useContext(GlobalContext);
  const [query, setQuery] = useState("");
  const [res, setRes] = useState("result");
  const [loading, setLoading] = useState(false);
  async function getResult() {
    console.log(query);
    const result = await GetResponse(query);
    if (result.success) {
      setLoading(false);
      console.log(result);
      const newdata = result.data.replace(/\*\*/g, "<br/>");
      const newdata2 = newdata.replace(/\*/g, "<br/>");
      setRes(newdata2);
      setQuery("")
    } else {
      setRes(result.message);
      setLoading(false);
      setQuery("")
    }
  }

  function handleLogout() {
    setAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }
  console.log(query);
  return (
    <>
      <Layout className="w-full h-screen">
        <Header>
          <div className="p-2 m-1 flex justify-between">
            <h1 className="text-xl font-serif text-white"> Health Chatbot</h1>
            <div className="flex flex-row  gap-x-3 text-white">
              <Button href="">profile</Button>
              <Button href="" onClick={handleLogout}>logout</Button>
            </div>
          </div>
        </Header>
        <Layout>
          <Sider className=" p-2">
            <div className=" flex flex-col gap-y-2 overflow-y-scroll h-[80vh]">
              <div className="border-b border-blue-400 rounded-sm">1</div>
            </div>
          </Sider>
          <Content>
            <section className="container h-full">
              <div className="relative h-full">
                <div className="row-span-3 rounded-md ">
                  <Paper
                    elevation={3}
                    className="bg-white w-full h-full p-4 border"
                  >
                    <p className="text-center p-1">result</p>
                    <Divider variant="middle" flexItem />
                    <div className="p-1 overflow-y-scroll h-96 ">
                      <div dangerouslySetInnerHTML={{ __html: res }}></div>
                    </div>
                  </Paper>
                </div>
                <div className="absolute rounded-md bottom-0 left-0 w-full">
                  <div className="flex flex-row justify-center items-center  gap-x-5 p-2">
                    <FormControl fullWidth className="m-3">
                      <InputLabel htmlFor="my-input">Query</InputLabel>
                      <Input
                        id="my-input"
                        aria-describedby="my-helper-text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <FormHelperText id="my-helper-text">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        enter the disease and what you want to know
                      </FormHelperText>
                    </FormControl>
                    <Divider variant="middle" flexItem orientation="vertical" />
                    {loading ? (
                      <Spin />
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        color="inherit"
                        className="p-2 "
                        onClick={() => {
                          setLoading(true);
                          getResult();
                        }}
                      >
                        <SendIcon />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </Content>
        </Layout>
        <Footer className="bg-blue-900">footer componet to be rendered</Footer>
      </Layout>
    </>
  );
}
