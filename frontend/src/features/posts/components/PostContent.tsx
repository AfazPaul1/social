import ReactMarkdown from 'react-markdown'
 import remarkGfm from 'remark-gfm'
 import remarkBreaks from 'remark-breaks'
 import rehypeSanitize from 'rehype-sanitize'
import { memo } from 'react';
import {selectPostContentFromPosts} from '../selectors/selectors'
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
export const PostContent = memo(({postId} : {postId:string}) => {
    const content =  useSelector((state: RootState) => selectPostContentFromPosts(state, postId))
         return <ReactMarkdown
                components={{
                    ol: ({ ...props }) => <ol className="list-decimal pl-6" {...props} />,
                    a: ({...props}) => <a className="underline text-[#334b5b] break-words" {...props} />
                }}
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    rehypePlugins={[rehypeSanitize]}
                >
                    {content}
            </ReactMarkdown>
})