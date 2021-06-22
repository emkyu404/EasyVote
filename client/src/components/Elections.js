import AddElection from "./AddElection"

const Elections = ({ onAddElection }) => {
    return (
        <div className='main-elections'>
            <AddElection onAddElection={onAddElection} />
            <h1 className='main-title'>Listes des élections</h1>
            
                <button className='btn-filtre-vote'>En cours</button>
                <button className='btn-filtre-result'>A venir</button>
                <button className='btn-filtre-soon'>Terminées</button>
            <div className='div-elections'>
                <div className='div-election'>
                    <h2>Nike dro ?</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris maximus egestas nisi at pretium. Nullam vel urna a tortor egestas egestas. Sed luctus vestibulum risus ut condimentum. Morbi libero ipsum, volutpat et volutpat at, sollicitudin porttitor lectus. Praesent eu massa quis lacus fermentum sollicitudin sed vel massa. Etiam finibus libero volutpat sollicitudin sodales. Integer a dui sed odio gravida auctor. Integer sed lobortis felis.</p>
                    <button className='btn-vote'>Répondre à l'élection</button>
                </div>
                <div className='div-election'>
                    <h2>Nike dro ?</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris maximus egestas nisi at pretium. Nullam vel urna a tortor egestas egestas. Sed luctus vestibulum risus ut condimentum. Morbi libero ipsum, volutpat et volutpat at, sollicitudin porttitor lectus. Praesent eu massa quis lacus fermentum sollicitudin sed vel massa. Etiam finibus libero volutpat sollicitudin sodales. Integer a dui sed odio gravida auctor. Integer sed lobortis felis.</p>
                    <button className='btn-result'>Voir les résultats</button>
                </div>
                <div className='div-election'>
                    <h2>Nike dro ?</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris maximus egestas nisi at pretium. Nullam vel urna a tortor egestas egestas. Sed luctus vestibulum risus ut condimentum. Morbi libero ipsum, volutpat et volutpat at, sollicitudin porttitor lectus. Praesent eu massa quis lacus fermentum sollicitudin sed vel massa. Etiam finibus libero volutpat sollicitudin sodales. Integer a dui sed odio gravida auctor. Integer sed lobortis felis.</p>
                    <button className='btn-soon'>A venir</button>
                </div>
            </div>
        </div>
    )
}

export default Elections
