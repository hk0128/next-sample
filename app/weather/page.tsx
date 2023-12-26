'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import axios from 'axios'
import styles from './page.module.css'

export default function Page() {
  const searchParams = useSearchParams()
  const code = searchParams.get("code")

  const urlAPI = `https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${code}.json`
  
  const [text, setText] = useState([])
  const [reportDatetime, setReportDatetime] = useState([])
  const [targetArea, setTargetArea] = useState([])

  const [error, setError] = useState(false)

  useEffect( () => {
    axios.get(urlAPI).then((res)=> {
      const d = JSON.parse(JSON.stringify(res.data))
      setText(d.text)
      setReportDatetime(d.reportDatetime)
      setTargetArea(d.targetArea)
    }).catch(error => {
      setError(true);
    });
  },[])

  return (
    <main className={styles.text}>
      {
        !error ? 
        (<div><p>{targetArea} : {reportDatetime}</p><p>{`${text}`}</p></div>):
        (<div><p>エラーが発生しました。</p></div>)
      }

      <Link href={{ pathname: '/' }}>戻る</Link>
    </main>
  )
}
