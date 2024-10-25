// "use client"
// import { trpcClient } from "@/tprc/client"
// import React, { useEffect, useState } from "react"

import { trpcClient } from "@/tprc/client"

// export default function Trpc() {
//   const [userList, setUserList] = useState<any[]>([])

//   const getUserList = async () => {
//     trpcClient.User.getUserList.query().then(({ data }) => setUserList(data))
//     try {
//       const { data } = await trpcClient.User.getUserList.query()
//       setUserList(data)
//     } catch (e) {
//       console.error(e)
//     }
//   }

//   useEffect(() => {
//     getUserList()
//   }, [])

//   const create = async () => {
//     trpcClient.User.createUser.mutate({
//       id: 5,
//       name: "tmd",
//       age: 100,
//       role: "user",
//     })
//   }

//   return (
//     <div className="mt-32">
//       <div>{JSON.stringify(userList)}</div>
//       <button onClick={create}>create</button>
//     </div>
//   )
// }

export default async function Trpc() {
  const { data } = await trpcClient.User.getUserList.query()

  return (
    <div className="mt-32">
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}
