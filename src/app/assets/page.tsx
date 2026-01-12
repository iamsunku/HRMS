'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Shell from "@/components/layout/Shell";
import { Plus, Search, Filter, MoreHorizontal, Monitor, Smartphone, Laptop, Printer, HardDrive, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock Data
const assets = [
    { id: 'AST-001', name: 'MacBook Pro M2', category: 'Laptop', model: 'A2338', serial: 'FVFD45678', user: 'Arjun Sharma', status: 'Assigned', purchaseDate: '2023-01-15' },
    { id: 'AST-002', name: 'Dell XPS 15', category: 'Laptop', model: '9520', serial: 'DL9876543', user: 'Priya Patel', status: 'Assigned', purchaseDate: '2023-02-20' },
    { id: 'AST-003', name: 'iPhone 14', category: 'Mobile', model: 'A2882', serial: 'GHJ123456', user: 'Rahul V.', status: 'Assigned', purchaseDate: '2023-03-10' },
    { id: 'AST-004', name: 'Canon Printer', category: 'Peripheral', model: 'LBP6030', serial: 'CN456789', user: '-', status: 'In Stock', purchaseDate: '2022-11-05' },
    { id: 'AST-005', name: 'Samsung Monitor', category: 'Monitor', model: 'LF24T350', serial: 'SM112233', user: '-', status: 'Maintenance', purchaseDate: '2022-12-12' },
];

export default function AssetsPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState('list');

    return (
        <Shell title="Asset Management">
            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm w-fit">
                        <button className="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-700 rounded-md shadow-sm">All Assets</button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">Assigned</button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">In Stock</button>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" icon={<Download size={18} />}>Report</Button>
                        <Button
                            onClick={() => router.push('/assets/new')}
                            icon={<Plus size={18} />}
                            className="bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200"
                        >
                            Add New Asset
                        </Button>
                    </div>
                </div>

                {/* Search & Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search by Asset ID, Name, or Serial Number..."
                                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                <RefreshCw size={18} />
                            </div>
                            <div className="text-sm font-medium text-gray-600">Total Assets</div>
                        </div>
                        <span className="text-xl font-bold text-gray-900">{assets.length}</span>
                    </div>
                </div>

                {/* Assets List Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Asset Details</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Assigned To</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {assets.map((asset) => (
                                    <tr key={asset.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                                                    {asset.category === 'Laptop' && <Laptop size={20} />}
                                                    {asset.category === 'Mobile' && <Smartphone size={20} />}
                                                    {asset.category === 'Monitor' && <Monitor size={20} />}
                                                    {asset.category === 'Peripheral' && <Printer size={20} />}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">{asset.name}</div>
                                                    <div className="text-xs text-gray-500 font-mono">{asset.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                                {asset.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {asset.user !== '-' ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                                        {asset.user.charAt(0)}
                                                    </div>
                                                    <span className="text-gray-900">{asset.user}</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 italic">Unassigned</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${asset.status === 'Assigned' ? 'bg-blue-50 text-blue-700' :
                                                    asset.status === 'In Stock' ? 'bg-green-50 text-green-700' :
                                                        'bg-yellow-50 text-yellow-700'
                                                }`}>
                                                <span className={`h-1.5 w-1.5 rounded-full ${asset.status === 'Assigned' ? 'bg-blue-500' :
                                                        asset.status === 'In Stock' ? 'bg-green-500' :
                                                            'bg-yellow-500'
                                                    }`}></span>
                                                {asset.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
