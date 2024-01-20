import { useState, useEffect } from 'react';
export interface AIModel {
    name: string;
    apiName: string;
    description: string;
    learnMore: string;
}

const models: AIModel[] = [
    {
        "name": "GPT-4 Turbo",
        "apiName": "gpt-4-1106-preview",
        "description": "The latest GPT-4 model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. Returns a maximum of 4,096 output tokens. This preview model is not yet suited for production traffic.",
        "learnMore": "https://openai.com/blog/new-models-and-developer-products-announced-at-devday"
    },
    {
        "name": "GPT-4 Vision Turbo",
        "apiName": "gpt-4-vision-preview",
        "description": "Ability to understand images, in addition to all other GPT-4 Turbo capabilities. Returns a maximum of 4,096 output tokens. This is a preview model version and not suited yet for production traffic.",
        "learnMore": "https://openai.com/blog/new-models-and-developer-products-announced-at-devday"
    },
    {
        "name": "GPT-4",
        "apiName": "gpt-4",
        "description": "Currently points to gpt-4-0613. See continuous model upgrades.",
        "learnMore": "https://openai.com/docs/models/gpt-4-and-gpt-4-turbo"
    },
    {
        "name": "GPT-4-32k",
        "apiName": "gpt-4-32k",
        "description": "Currently points to gpt-4-32k-0613. See continuous model upgrades.",
        "learnMore": "https://openai.com/docs/models/gpt-4-and-gpt-4-turbo"
    },
    {
        "name": "GPT-3.5 Turbo",
        "apiName": "gpt-3.5-turbo",
        "description": "A set of models that improve on GPT-3 and can understand as well as generate natural language or code.",
        "learnMore": "https://openai.com/docs/models/gpt-3-5"
    },
    {
        "name": "GPT-3.5 Turbo 1106",
        "apiName": "gpt-3.5-turbo-1106",
        "description": "Updated GPT 3.5 Turbo - The latest GPT-3.5 Turbo model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. Returns a maximum of 4,096 output tokens.",
        "learnMore": "https://openai.com/docs/models/gpt-3-5"
    },
    {
        "name": "GPT-3.5 Turbo 16k",
        "apiName": "gpt-3.5-turbo-16k",
        "description": "Currently points to gpt-3.5-turbo-0613.",
        "learnMore": "https://openai.com/docs/models/gpt-3-5"
    },
    {
        "name": "GPT-3.5 Turbo Instruct",
        "apiName": "gpt-3.5-turbo-instruct",
        "description": "Similar capabilities as GPT-3 era models. Compatible with legacy Completions endpoint and not Chat Completions.",
        "learnMore": "https://openai.com/docs/models/gpt-3-5"
    }, {
        "name": "GPT-3.5 Turbo 0613",
        "apiName": "gpt-3.5-turbo-0613",
        "description": "Snapshot of gpt-3.5-turbo from June 13th 2023. Will be deprecated on June 13, 2024.",
        "learnMore": "https://openai.com/docs/deprecations/2023-10-06-chat-model-updates"
    },
    {
        "name": "GPT-3.5 Turbo 16k 0613",
        "apiName": "gpt-3.5-turbo-16k-0613",
        "description": "Snapshot of gpt-3.5-16k-turbo from June 13th 2023. Will be deprecated on June 13, 2024.",
        "learnMore": "https://openai.com/docs/deprecations/2023-10-06-chat-model-updates"
    },
    {
        "name": "GPT-3.5 Turbo 0301",
        "apiName": "gpt-3.5-turbo-0301",
        "description": "Snapshot of gpt-3.5-turbo from March 1st 2023. Will be deprecated on June 13th 2024.",
        "learnMore": "https://openai.com/docs/deprecations/2023-10-06-chat-model-updates"
    },
    {
        "name": "GPT Base Babbage-002",
        "apiName": "babbage-002",
        "description": "Replacement for the GPT-3 ada and babbage base models.",
        "learnMore": "https://openai.com/docs/models/gpt-base"
    },
    {
        "name": "GPT Base Davinci-002",
        "apiName": "davinci-002",
        "description": "Replacement for the GPT-3 curie and davinci base models.",
        "learnMore": "https://openai.com/docs/models/gpt-base"
    }
]

const fuzzyWordMatch = (needle: string, haystack: string) => {
    const needleWords = needle.split(" ");
    const haystackWords = haystack.split(" ");
    return needleWords.every(needleWord => {
        return haystackWords.some(haystackWord => {
            return haystackWord.includes(needleWord);
        });
    });

}

const searchModels = (query: string) => {
    //search by name and apiName
    return models.filter(model => {
        return fuzzyWordMatch(query.toLowerCase(), model.name.toLowerCase()) || fuzzyWordMatch(query.toLowerCase(), model["apiName"].toLowerCase());
    });
}

type useGetModelsResponse = {
    models: AIModel[];
    loading: boolean;
    error: string;
}

const useGetModels = (query: string): useGetModelsResponse => {
    const [models, setModels] = useState<AIModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    useEffect(() => {
        setLoading(true);
        try {
            setModels(searchModels(query));
        } catch (error) {
            setError((error as any).message);
        } finally {
            setLoading(false);
        }
    }, [query]);

    return { models, loading, error };
}

export default useGetModels;
