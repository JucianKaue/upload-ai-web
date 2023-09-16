import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { api } from '@/lib/axios'

interface Prompt {
    id: string
    title: string
    template: string
}

interface PromptSelectProps {
    onPromptSelection: (template: string) => void
}

export function PromptSelect(props: PromptSelectProps) {
    const [prompts, setPrompts] = useState<Prompt[] | null>(null)

    useEffect(() => {
        api.get('/prompts').then(response => {
            setPrompts(response.data)
            console.log(response.data)
        })
    }, [])

    function handlePromptSelection(promptId: string) {
        const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

        if (!selectedPrompt) {
            return
        }

        props.onPromptSelection(selectedPrompt.template)
    }

    return (
        <>
            <Select onValueChange={handlePromptSelection}>
                <SelectTrigger>
                    <SelectValue placeholder='Selecione um prompt'/>
                </SelectTrigger>
                <SelectContent>
                    {prompts?.map(prompt => {
                        return (
                            <SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
        </>
    )
}