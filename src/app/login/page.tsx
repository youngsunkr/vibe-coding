// src/app/login/page.tsx (예시)
'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

// .env에서 환경 변수를 불러옵니다.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';
const JWT_SECRET = process.env.JWT_SECRET || 'ThisIsAStrongSecretKeyForJWT1234567890'; // 실제로는 서버에서 발급받아야 함

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
