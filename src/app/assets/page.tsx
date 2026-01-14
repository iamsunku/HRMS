'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Shell from "@/components/layout/Shell";
import {
    Plus,
    Search,
    MoreHorizontal,
    Monitor,
    Smartphone,
    Laptop,
    Printer,
    Download,
    RefreshCw,
    Trash2,
    Edit,
    UserCheck,
    RotateCcw,
    X,
    Save,
    User
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock Employees List
const EMPLOYEES = [
    { id: '1', name: 'Rahul Vikram', department: 'Engineering' },
    { id: '2', name: 'Priya Patel', department: 'Human Resources' },
    { id: '3', name: 'Sneha L.', department: 'Design' },
    { id: '4', name: 'Arjun Sharma', department: 'Engineering' },
    { id: '5', name: 'Sara Ali', department: 'Operations' },
];

// Mock Data
const initialAssets = [
    { id: 'AST-001', name: 'MacBook Pro M2', category: 'Laptop', model: 'A2338', serial: 'FVFD45678', user: 'Arjun Sharma', status: 'Assigned', purchaseDate: '2023-01-15' },
    { id: 'AST-002', name: 'Dell XPS 15', category: 'Laptop', model: '9520', serial: 'DL9876543', user: 'Priya Patel', status: 'Assigned', purchaseDate: '2023-02-20' },
    { id: 'AST-003', name: 'iPhone 14', category: 'Mobile', model: 'A2882', serial: 'GHJ123456', user: 'Rahul Vikram', status: 'Assigned', purchaseDate: '2023-03-10' },
    { id: 'AST-004', name: 'Canon Printer', category: 'Peripheral', model: 'LBP6030', serial: 'CN456789', user: '-', status: 'In Stock', purchaseDate: '2022-11-05' },
    { id: 'AST-005', name: 'Samsung Monitor', category: 'Monitor', model: 'LF24T350', serial: 'SM112233', user: '-', status: 'Maintenance', purchaseDate: '2022-12-12' },
    { id: 'AST-006', name: 'iPad Air', category: 'Mobile', model: 'M1', serial: 'APL9922', user: '-', status: 'In Stock', purchaseDate: '2023-05-15' },
    { id: 'AST-007', name: 'Logitech Mouse', category: 'Peripheral', model: 'MX Master 3', serial: 'LOGI7733', user: 'Sara Ali', status: 'Assigned', purchaseDate: '2023-06-01' },
];

export default function AssetsPage() {
    const router = useRouter();
    const [assets, setAssets] = useState(initialAssets);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeActionId, setActiveActionId] = useState<string | null>(null);

    // Modal States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [currentAsset, setCurrentAsset] = useState<any>(null);

    // Form States
    const [editForm, setEditForm] = useState<any>({ name: '', model: '', serial: '', category: '' });
    const [selectedEmployee, setSelectedEmployee] = useState('');

    // Filter Logic
    const filteredAssets = useMemo(() => {
        return assets.filter(asset => {
            const matchesFilter = filter === 'All' || asset.status === filter;
            const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                asset.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                asset.serial.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [assets, filter, searchQuery]);

    // Handlers
    const openEditModal = (asset: any) => {
        setCurrentAsset(asset);
        setEditForm({ ...asset });
        setIsEditModalOpen(true);
        setActiveActionId(null);
    };

    const openAssignModal = (asset: any) => {
        setCurrentAsset(asset);
        setSelectedEmployee('');
        setIsAssignModalOpen(true);
        setActiveActionId(null);
    };

    const handleSaveEdit = () => {
        setAssets(assets.map(a => a.id === currentAsset.id ? { ...a, ...editForm } : a));
        setIsEditModalOpen(false);
    };

    const handleAssign = () => {
        if (!selectedEmployee) return;
        setAssets(assets.map(a =>
            a.id === currentAsset.id ? { ...a, status: 'Assigned', user: selectedEmployee } : a
        ));
        setIsAssignModalOpen(false);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this asset?')) {
            setAssets(assets.filter(a => a.id !== id));
            setActiveActionId(null);
        }
    };

    const handleReturnToStock = (id: string) => {
        setAssets(assets.map(a =>
            a.id === id ? { ...a, status: 'In Stock', user: '-' } : a
        ));
        setActiveActionId(null);
    };

    return (
        <Shell title="Asset Management">
            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm w-fit">
                        {['All', 'Assigned', 'In Stock', 'Maintenance'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setFilter(t)}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === t
                                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                {t === 'All' ? 'All Assets' : t}
                            </button>
                        ))}
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
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
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
                            <div className="text-sm font-medium text-gray-600">Visible Assets</div>
                        </div>
                        <span className="text-xl font-bold text-gray-900">{filteredAssets.length}</span>
                    </div>
                </div>

                {/* Assets Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
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
                                {filteredAssets.length > 0 ? filteredAssets.map((asset) => (
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
                                                    <span className="text-gray-900 font-medium">{asset.user}</span>
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
                                            <div className="flex justify-end items-center gap-1">
                                                <button
                                                    onClick={() => setActiveActionId(activeActionId === asset.id ? null : asset.id)}
                                                    className={`p-2 rounded-lg transition-colors ${activeActionId === asset.id ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                                                >
                                                    <MoreHorizontal size={18} />
                                                </button>

                                                {activeActionId === asset.id && (
                                                    <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-1 flex gap-1 animate-in fade-in slide-in-from-right-2 duration-200">
                                                        {asset.status === 'In Stock' && (
                                                            <button
                                                                onClick={() => openAssignModal(asset)}
                                                                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg"
                                                            >
                                                                <UserCheck size={14} /> Assign
                                                            </button>
                                                        )}
                                                        {asset.status === 'Assigned' && (
                                                            <button
                                                                onClick={() => handleReturnToStock(asset.id)}
                                                                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-50 rounded-lg"
                                                            >
                                                                <RotateCcw size={14} /> Return
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => openEditModal(asset)}
                                                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
                                                        >
                                                            <Edit size={14} /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(asset.id)}
                                                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg"
                                                        >
                                                            <Trash2 size={14} /> Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            No assets found matching your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit Asset Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <Edit size={18} className="text-purple-600" />
                                Edit Asset Details
                            </h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Asset Name</label>
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-100 focus:border-purple-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                                    <select
                                        value={editForm.category}
                                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-100 focus:border-purple-500 outline-none"
                                    >
                                        <option value="Laptop">Laptop</option>
                                        <option value="Mobile">Mobile</option>
                                        <option value="Monitor">Monitor</option>
                                        <option value="Peripheral">Peripheral</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
                                    <select
                                        value={editForm.status}
                                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-100 focus:border-purple-500 outline-none"
                                    >
                                        <option value="In Stock">In Stock</option>
                                        <option value="Assigned">Assigned</option>
                                        <option value="Maintenance">Maintenance</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Model</label>
                                    <input
                                        type="text"
                                        value={editForm.model}
                                        onChange={(e) => setEditForm({ ...editForm, model: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-100 focus:border-purple-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Serial Number</label>
                                    <input
                                        type="text"
                                        value={editForm.serial}
                                        onChange={(e) => setEditForm({ ...editForm, serial: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-100 focus:border-purple-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                            <Button
                                onClick={handleSaveEdit}
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                                icon={<Save size={16} />}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Assign Asset Modal */}
            {isAssignModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-blue-50/30">
                            <h3 className="font-bold text-blue-900 flex items-center gap-2">
                                <UserCheck size={18} className="text-blue-600" />
                                Assign Asset
                            </h3>
                            <button onClick={() => setIsAssignModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-4">
                                <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                                    {currentAsset?.category === 'Laptop' && <Laptop size={20} />}
                                    {currentAsset?.category === 'Mobile' && <Smartphone size={20} />}
                                    {currentAsset?.category === 'Monitor' && <Monitor size={20} />}
                                    {currentAsset?.category === 'Peripheral' && <Printer size={20} />}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">{currentAsset?.name}</div>
                                    <div className="text-xs text-blue-600 font-medium">{currentAsset?.id}</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                                        <User size={12} /> Select Employee
                                    </label>
                                    <select
                                        value={selectedEmployee}
                                        onChange={(e) => setSelectedEmployee(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat"
                                    >
                                        <option value="">Choose an employee...</option>
                                        {EMPLOYEES.map(emp => (
                                            <option key={emp.id} value={emp.name}>
                                                {emp.name} ({emp.department})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setIsAssignModalOpen(false)}>Cancel</Button>
                            <Button
                                onClick={handleAssign}
                                disabled={!selectedEmployee}
                                className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                                icon={<UserCheck size={16} />}
                            >
                                Confirm Assignment
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Shell>
    );
}
