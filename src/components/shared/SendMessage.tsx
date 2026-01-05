"use client";

import {
  Camera,
  Grid2x2Check,
  ImagePlus,
  Loader2,
  Send,
  XIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSendMessage } from "@/type/message";
import { sendMessageSchema } from "../module/auth/authValidation";
import Image from "next/image";
import { useRef, useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import { toast } from "sonner";

export default function SendMessage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<TSendMessage>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      text: "",
      image: "",
    },
  });

  const { sendMessage } = useChatStore();

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit: SubmitHandler<TSendMessage> = async (data) => {
    // console.log("submit main Message Data", data);

    // const res = await sendMessage(data);
    // console.log(res);

    // reset();

    const res = await sendMessage({
      text: data.text,
      image: "",
    });

    // console.log("data res", res?.data);

    if (res?.success) {
      // console.log("hhh", res);
      
      toast.success(res?.message);
      reset();
    } else {
      // console.log(res.message);

      toast.error(res?.message);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    // <div className="w-full">
    //   <div className="relative flex font-sans  w-full justify-center items-center gap-2">
    //     <Form {...form}>
    //       <form
    //         onSubmit={form.handleSubmit(onSubmit)}
    //         className="flex items-center gap-2"
    //       >
    //         {/* message input box */}
    //         <div className="relative p-px rounded-2xl shadow-lg w-full">
    //           <div className="flex items-center px-4 py-2 rounded-[15px] w-full border-2 border-amber-600">
    //             <Grid2x2Check />

    //             {/* TEXT FIELD */}
    //             <FormField
    //               control={form.control}
    //               name="text"
    //               render={({ field }) => (
    //                 <FormItem className="w-full">
    //                   <FormControl>
    //                     <input
    //                       type="text"
    //                       {...field}
    //                       value={field.value || ""}
    //                       placeholder="Input text message"
    //                       className="flex-1 min-w-0 px-3 py-1 text-lg bg-transparent focus:outline-none"
    //                     />
    //                   </FormControl>

    //                   <FormMessage className="text-red-500 text-xs mt-1" />
    //                 </FormItem>
    //               )}
    //             />

    //             {/* IMAGE FIELD */}
    //             <FormField
    //               control={form.control}
    //               name="image"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormControl>
    //                     <input
    //                       type="file"
    //                       accept="image/*"
    //                       className="hidden"
    //                       onChange={(e) => field.onChange(e.target.files?.[0])}
    //                       id="chat-image"
    //                     />
    //                   </FormControl>

    //                   <label
    //                     htmlFor="chat-image"
    //                     className="flex items-center gap-2 cursor-pointer"
    //                   >
    //                     <div className="flex items-center justify-center p-1.5">
    //                       <ImagePlus />
    //                     </div>

    //                     <div className="flex items-center justify-center w-6 h-6 p-1">
    //                       <Camera />
    //                     </div>
    //                   </label>

    //                   <FormMessage className="text-red-500 text-xs mt-1" />
    //                 </FormItem>
    //               )}
    //             />
    //           </div>
    //         </div>

    //         {/* SEND BUTTON */}
    //         <div>
    //           <Button
    //             variant="ghost"
    //             type="submit"
    //             className="border-2 rounded-full p-2 bg-blue-400 hover:bg-blue-500"
    //             disabled={isSubmitting}
    //           >
    //             {isSubmitting ? (
    //               <Loader2 />
    //             ) : (
    //               <Send className="text-yellow-400 hover:text-yellow-500" />
    //             )}
    //           </Button>
    //         </div>
    //       </form>
    //     </Form>
    //   </div>
    // </div>
    <div className="w-full">
      <div className="relative flex font-sans w-full items-center gap-2">
        {imagePreview && (
          <div className="max-w-3xl mx-auto mb-3 flex items-center">
            <div className="relative">
              <Image
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-slate-700"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
                type="button"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center gap-2 w-full"
          >
            {/* MESSAGE BOX */}
            <div className="relative p-px rounded-2xl shadow-lg w-full flex-1">
              <div className="flex items-center px-4 py-2 rounded-[15px] w-full border-2 border-amber-600">
                <Grid2x2Check />

                {/* TEXT FIELD */}
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem className="w-full flex-1">
                      <FormControl>
                        <input
                          type="text"
                          {...field}
                          value={field.value || ""}
                          placeholder="Input text message"
                          className="flex-1 min-w-0 px-3 py-1 text-lg bg-transparent focus:outline-none"
                        />
                      </FormControl>

                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </FormItem>
                  )}
                />

                {/* IMAGE FIELD */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="chat-image"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>

                      <label
                        htmlFor="chat-image"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <div className="flex items-center justify-center p-1.5">
                          <ImagePlus />
                        </div>

                        <div className="flex items-center justify-center w-6 h-6 p-1">
                          <Camera />
                        </div>
                      </label>

                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* SEND BUTTON */}
            <Button
              variant="ghost"
              type="submit"
              className="border-2 rounded-full p-2 bg-blue-400 hover:bg-blue-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Send className="text-yellow-400 hover:text-yellow-500" />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
