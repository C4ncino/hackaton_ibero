import PageTemplate from "@assets/page/PageTemplate"

const DiaryNotes = () => {
     return (
          <PageTemplate>
               <div className="m-16">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium dark:text-white">Your message</label>
                    <textarea id="message" className="block p-4 w-full text-sm text-gray-900 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Write your thoughts here..."></textarea>
               </div>
          </PageTemplate>
     )
}

export default DiaryNotes