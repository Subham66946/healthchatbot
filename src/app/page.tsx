"use client";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Paper,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { GetResponse } from "@/services/search";
export default function Home() {
  const [query, setQuery] = useState("");
  const [res,setRes]=useState("result")
  async function getResult() {
    const result = await GetResponse(query);
    if (result){
      setRes(result.data)
    }
  }
  return (
    <>
      <section className="w-full p-2 m-2 ">
        <div className="grid grid-cols-12 grid-rows-6 gap-4">
          <div className="col-span-8 row-span-4 col-start-5 row-start-1  rounded-md">
            <Paper
              elevation={3}
              className="bg-white w-full h-full p-4 border border-blue-400"
            >
              <p className="text-center p-1">result</p>
              <Divider variant="middle" flexItem />
              <div className="p-1 overflow-y-auto">
               {res}
              </div>
            </Paper>
          </div>
          <div className="col-span-8 row-span-2 col-start-5 row-start-5 border-2 border-blue-400 rounded-md">
            <div className="flex flex-row justify-center items-center  gap-x-5 p-2">
              <FormControl fullWidth className="m-3">
                <InputLabel htmlFor="my-input">Query</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" onChange={e => setQuery(e.target.value)} />
                <FormHelperText id="my-helper-text">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  enter the disease and what you want to know
                </FormHelperText>
              </FormControl>
              <Divider variant="middle" flexItem orientation="vertical" />
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                className="p-2 "
                onClick={getResult}
              >
                <SendIcon />
              </Button>
            </div>
          </div>
          <div className="col-span-4 row-span-6 col-start-1 row-start-1 aspect-square border-8 border-blue-400 rounded-lg">
            <div className=" flex flex-col justify-center items-center text-center m-1">
              <p className="tracking-wider text-2xl p-2 font-mono text-bold">
                Recent Chats
              </p>
              <Divider className="w-full border-2 border-black">CENTER</Divider>
              <div>here we have to show the chats in the recent history</div>
              <div>
                {query}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
