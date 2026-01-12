'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Shell from "@/components/layout/Shell";
import { ArrowLeft, Save, Monitor, CreditCard, User, Box, ShieldCheck, Calendar, Info } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export default function AddAssetPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        assetName: '',
        assetId: '',
        category: 'LAPTOP',
        modelNumber: '',
        serialNumber: '',
        purchaseDate: '',
        purchaseValue: '',
        status: 'IN_STOCK',
        condition: 'NEW',
        assignedTo: '',
        assignedDate: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            router.push('/assets');
            // In a real app we would use a toast notification here
        }, 1000);
    };

    return (
        <Shell title="Register New Asset">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Back Button */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        <div className="mr-2 rounded-full p-1 group-hover:bg-blue-50 transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                        </div>
                        Back to Inventory
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                <Box className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Asset Details</h2>
                                <p className="text-sm text-gray-500">Enter the specifications and financial details for the new equipment.</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="space-y-10">
                            {/* Asset Information Section */}
                            <section>
                                <div className="flex items-center space-x-2 text-blue-900 mb-6">
                                    <Monitor className="h-5 w-5 opacity-70" />
                                    <h3 className="text-sm font-bold uppercase tracking-wider">Asset Information</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <Input
                                        label="Asset Name *"
                                        name="assetName"
                                        placeholder="e.g. MacBook Pro M3"
                                        required
                                        value={formData.assetName}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label="Asset ID / Tag *"
                                        name="assetId"
                                        placeholder="e.g. AST-2024-001"
                                        required
                                        value={formData.assetId}
                                        onChange={handleChange}
                                    />
                                    <Select
                                        label="Category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'LAPTOP', label: 'Laptop / Computer' },
                                            { value: 'MOBILE', label: 'Mobile Device' },
                                            { value: 'PERIPHERAL', label: 'Peripheral (Keyboard, Mouse)' },
                                            { value: 'MONITOR', label: 'Monitor / Display' },
                                            { value: 'FURNITURE', label: 'Furniture' },
                                            { value: 'LICENSE', label: 'Software License' },
                                        ]}
                                    />
                                    <Input
                                        label="Model Number"
                                        name="modelNumber"
                                        placeholder="e.g. A2992"
                                        value={formData.modelNumber}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label="Serial Number"
                                        name="serialNumber"
                                        placeholder="e.g. H2K3445"
                                        value={formData.serialNumber}
                                        onChange={handleChange}
                                    />
                                    <Select
                                        label="Status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'IN_STOCK', label: 'In Stock' },
                                            { value: 'ASSIGNED', label: 'Assigned' },
                                            { value: 'MAINTENANCE', label: 'In Maintenance' },
                                            { value: 'RETIRED', label: 'Retired / Scrapped' },
                                        ]}
                                    />
                                </div>
                            </section>

                            <div className="border-t border-gray-100"></div>

                            {/* Financial Details Section */}
                            <section>
                                <div className="flex items-center space-x-2 text-blue-900 mb-6">
                                    <CreditCard className="h-5 w-5 opacity-70" />
                                    <h3 className="text-sm font-bold uppercase tracking-wider">Financial Details</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                                    <Input
                                        label="Purchase Date"
                                        name="purchaseDate"
                                        type="date"
                                        value={formData.purchaseDate}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label="Purchase Value (INR)"
                                        name="purchaseValue"
                                        type="number"
                                        placeholder="e.g. 150000"
                                        value={formData.purchaseValue}
                                        onChange={handleChange}
                                    />
                                    <Select
                                        label="Condition"
                                        name="condition"
                                        value={formData.condition}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'NEW', label: 'New' },
                                            { value: 'GOOD', label: 'Good' },
                                            { value: 'FAIR', label: 'Fair' },
                                            { value: 'POOR', label: 'Poor' },
                                        ]}
                                    />
                                </div>
                            </section>

                            <div className="border-t border-gray-100"></div>

                            {/* User Assignment Section */}
                            <section>
                                <div className="flex items-center space-x-2 text-blue-900 mb-6">
                                    <User className="h-5 w-5 opacity-70" />
                                    <h3 className="text-sm font-bold uppercase tracking-wider">User Assignment</h3>
                                </div>
                                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 mb-6">
                                    <div className="flex items-start gap-3">
                                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                                        <div className="text-sm text-blue-800">
                                            If you assign this asset now, the status will automatically change to <strong>Assigned</strong> and the user will be notified.
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <Select
                                        label="Assign To User"
                                        name="assignedTo"
                                        value={formData.assignedTo}
                                        onChange={handleChange}
                                        options={[
                                            { value: '', label: 'Select Employee...' },
                                            { value: 'emp_001', label: 'Arjun Sharma' },
                                            { value: 'emp_002', label: 'Priya Patel' },
                                            { value: 'emp_003', label: 'Rahul V.' },
                                        ]}
                                    />
                                    <Input
                                        label="Assignment Date"
                                        name="assignedDate"
                                        type="date"
                                        value={formData.assignedDate}
                                        onChange={handleChange}
                                        disabled={!formData.assignedTo}
                                    />
                                </div>
                            </section>
                        </div>

                        <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                className="px-6"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                isLoading={loading}
                                icon={<Save className="h-4 w-4" />}
                                className="px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200"
                            >
                                Save Asset
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Shell>
    );
}
