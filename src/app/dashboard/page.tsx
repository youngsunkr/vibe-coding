// src/app/dashboard/page.tsx (예시)
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

export default function DashboardPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // 1. 토큰 확인 및 헤더 설정
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError("로그인이 필요합니다.");
      router.push('/login');
      return;
    }

    try {
      // 2. API 호출 시 JWT 토큰을 Authorization 헤더에 포함
      const response = await axios.get(`${API_BASE_URL}/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(response.data);
      setError('');
    } catch (err) {
      console.error("API Error:", err);
      setError('데이터를 불러오는 중 오류가 발생했습니다. 토큰이 만료되었거나 권한이 부족할 수 있습니다.');
      // 토큰 만료 시 로그아웃 처리
      localStorage.removeItem('authToken');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="text-center mt-10">데이터를 불러오는 중...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">HR 대시보드</h1>
        <button 
          onClick={() => {
            localStorage.removeItem('authToken');
            router.push('/login');
          }}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        >
          로그아웃
        </button>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">직원 목록 (보호됨)</h2>
      {employees.length === 0 ? (
        <p>조회된 직원이 없습니다.</p>
      ) : (
        <div className="overflow-x-auto shadow border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">직위</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">입사일</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{emp.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{emp.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(emp.hire_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
