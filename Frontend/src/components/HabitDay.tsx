import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgressBar";

export function HabitDay(){
	return (
        <Popover.Root>
            <Popover.Trigger className={"w-10 h-10 border-2 rounded-lg bg-yellow-900 border-zinc-800"}/>
            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
                    <span className="font-semibold text-zinc-400">terça-feira</span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl">04/04 </span>
                    <ProgressBar progress={75} />
                    <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
