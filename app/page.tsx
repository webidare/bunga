'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Component() {
  const [number, setNumber] = useState('')
  const [messageType, setMessageType] = useState('arrival')
  const [customMessage, setCustomMessage] = useState('')

  const defaultMessages = {
    arrival: 'Salam sejahtera. Saya dari layanan pengiriman ShopeeFood. Pesanan makanan Anda sudah sampai.',
    delivery: 'Mohon maaf mengganggu, apakah pesanan akan kami serahkan langsung kepada Anda atau kami titipkan di tempat yang telah Anda tentukan?',
    feedback: 'Terima kasih sudah memesan di ShopeeFood. Kami senang sekali jika Anda berkenan memberikan rating dan ulasan tentang pengalaman Anda.',
    doubleorder: 'Di karenakan double order otomatis dari ShopeeFood, kemungkinan makanan datang sedikit lebih lama dari biasanya.'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (number) {
      let cleanNumber = number.replace(/[^\d+]/g, '')
      if (cleanNumber.startsWith('0')) {
        cleanNumber = '62' + cleanNumber.slice(1)
      }
      const message = customMessage || defaultMessages[messageType as keyof typeof defaultMessages]
      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`
      window.open(whatsappUrl, '_blank')
    }
  }

  return (
    <div className="min-h-screen p-4 flex items-center justify-center relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <Card className="w-full max-w-md overflow-hidden shadow-xl">
        <CardHeader className="bg-[#ee4d2d] text-white p-6">
          <CardTitle className="text-center text-2xl font-bold">
            ShopeeFood WhatsApp Sender
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="number" className="text-[#ee4d2d] font-semibold">Nomor WhatsApp</Label>
              <Input
                id="number"
                placeholder="Masukkan nomor WhatsApp"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
                className="border-[#ee4d2d] focus-visible:ring-[#ee4d2d]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="messageType" className="text-[#ee4d2d] font-semibold">Jenis Pesan</Label>
              <Select
                value={messageType}
                onValueChange={(value) => {
                  setMessageType(value)
                  setCustomMessage('')
                }}
              >
                <SelectTrigger className="border-[#ee4d2d] focus:ring-[#ee4d2d]">
                  <SelectValue placeholder="Pilih jenis pesan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arrival">Pesanan Sampai</SelectItem>
                  <SelectItem value="delivery">Konfirmasi Pengiriman</SelectItem>
                  <SelectItem value="feedback">Permintaan Ulasan</SelectItem>
                  <SelectItem value="doubleorder">Notifikasi Double Order</SelectItem>       
                  <SelectItem value="custom">Pesan Kustom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {messageType === 'custom' ? (
              <div className="space-y-2">
                <Label htmlFor="message" className="text-[#ee4d2d] font-semibold">Pesan Kustom</Label>
                <Textarea
                  id="message"
                  placeholder="Masukkan pesan Anda"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={4}
                  className="border-[#ee4d2d] focus-visible:ring-[#ee4d2d]"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="defaultMessage" className="text-[#ee4d2d] font-semibold">Pesan Default</Label>
                <Textarea
                  id="defaultMessage"
                  value={defaultMessages[messageType as keyof typeof defaultMessages]}
                  readOnly
                  rows={4}
                  className="bg-gray-100 border-[#ee4d2d]"
                />
              </div>
            )}
            <Button type="submit" className="w-full bg-[#ee4d2d] hover:bg-[#d73211] text-white transition-colors duration-300">
              <Send className="mr-2 h-4 w-4" />
              Kirim Pesan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
