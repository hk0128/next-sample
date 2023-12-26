'use client'

import React, { useState } from 'react'
import Link from "next/link"
import styles from './page.module.css'
import { areaCodes } from './areaCode'

export default function Home() {
  const [area, setArea] = useState(areaCodes[19].code)

  return (
    <main className={styles.main}>
      <select onChange={(e) => {setArea(e.target.value)}} value={area}>
        {
          areaCodes.map((a) => {
            return (<option value={a.code} key={a.code}>{a.area}</option>)
          })
        }
      </select>
      <div>
        <Link href={{ pathname: '/weather', query: { code: area} }}>天気を確認する</Link>
      </div>
    </main>
  )
}
