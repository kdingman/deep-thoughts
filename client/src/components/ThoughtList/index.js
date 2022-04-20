import React from "react";

// Instruct the Thoughtlist component to receive 2 props -> Title and Thoughts array
// Destruct the argument data to avoid using props.title and props.thoughts thoughout JSX code
// Render JSX by checking to see if theres even any data in the thoughts array first
// If there is no data, return a message stating that, if there is data return a list of thoughts using the .map() method
// Check the value or thought.reactionCount -> No reaction = user will add first reaction, if reaction -> user will view then submit their own

const ThoughtList = ({ thoughts, title }) => {
    if (!thoughts.length) {
        return <h3>No Thoughts Yet</h3>;
    }

return (
    <div>
        <h3>{title}</h3>
        {thoughts &&
            thoughts.map(thought => (
                <div key={thought.id} className="card mb-3">
                    <p className="card-header">
                        {thought.username}
                        thought on {thought.createdAt}
                    </p>
                    <div className="card-body">
                        <p>{thought.thoughtText}</p>
                        <p className="mb-0">
                            Reactions: {thought.reactionCount} || Click to{' '}
                            {thought.reactionCount ? 'see' : 'start'} the discussion!
                        </p>
                    </div>
                    </div>
            ))}
    </div>
);
};

export default ThoughtList;