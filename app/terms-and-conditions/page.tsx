const ourTc:string= '/terms-and-conditions.pdf';

const Termsandconditions = () => {
    return (
        <div className="w-full gap-4">
            <div className="h-full flex justify-center bg-opacity-75 bg-black">
                <div style={{ width: '100%', height: '600px' }}>
                    <iframe src={ourTc} style={{ width: '100%', height: '100%' }} frameBorder="0" />
                </div>

            </div>

        </div>
    );
}

export default Termsandconditions;