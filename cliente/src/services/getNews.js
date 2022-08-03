import axios from "axios"

const getNews = async (request) =>{

    try {
        document.querySelector('.bounce-loader').classList.add('active');
        const {data} = await axios.get(request);
        const newsList = data[0].data.map( news => {
            return (
                {
                    id: news.id,
                    title: news.title,
                    image: news.imageUrl,
                    content: news.content,
                    date: new Date(news.date)
                }
                
            )
        })
        document.querySelector('.bounce-loader').classList.remove('active');
        return [data[0].count, newsList]
    }

    catch (err) {
        console.log(err);
        document.querySelector('.bounce-loader').classList.remove('active');
    }
  
}

export default getNews