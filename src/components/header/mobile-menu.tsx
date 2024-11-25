"use client"
import { AlignRight } from "lucide-react"
import { Button } from "~/lib/components/shadcn/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/lib/components/shadcn/ui/drawer"

export default function MobileMenu() {
  return (
    <>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <button className="h-10 flex items-center px-3 md:hidden">
            <AlignRight className="size-4 text-[var(--mini-c-text-2)]"></AlignRight>
          </button>
        </DrawerTrigger>

        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>

            <div className="p-4 pb-0">空</div>

            <DrawerFooter>
              <Button>Submit</Button>

              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
