import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import RSVPForm from './RSVPForm';
import BasicModal from './BasicModal';
import _ from 'lodash'; 


const steps = [
  'Enter RSVP Code',
  'Add Guests',
];

export default function VerticalLinearStepper() {
  const [rsvpCode, setRsvpCode] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(null);
  const [rsvpCodeStatus, setRsvpCodeStatus] = useState('');
  const [isWrongCode, setIsWrongCode] = useState(false);
  const [guests, setGuests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [guestToReview, setGuestToReview] = useState(null);
  const [isRSVPComplete, setIsRSVPComplete] = useState(false);



  const completedGuests = guests.filter(guest => guest?.fullName !== '');

  const selectedStep = rsvpCodeStatus === 'Success' ? isRSVPComplete ? 2 : 1 : 0;

  function handleNextGuest () {
    setGuestToReview((oldGuestIndex) => oldGuestIndex + 1);
  }

  async function SubmitRSVP () {
    console.log('submitting rsvp')
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({ guests: completedGuests }),
    });

    if (response?.ok) {
        console.log('success');
        setIsModalOpen(false);
        setIsRSVPComplete(true);
    }
    else {
        console.log('didnt work')
    }
  }

  function handleInitiateSaveGuests () {
    console.log({ completedGuests });
    console.log('handle initiate save guests');
    console.log(completedGuests[0]);
    setGuestToReview(0);
    handleOpenModal();
  }

  // Initialize guests with blank objects and increasing id values
  useEffect(() => {
    const blankGuests = Array.from({ length: numberOfGuests }, (_, index) => ({
      id: index + 1,
      fullName: '',
      dinnerSelection: '',
      phoneNumber: '',
      email: '',
      rsvpCode: rsvpCode
    }));
    setGuests(blankGuests);
  }, [numberOfGuests]);

  const handleGuestChange = (index, updatedGuest) => {
    const updatedGuests = [...guests];
    updatedGuests[index] = { ...guests[index], ...updatedGuest }
    setGuests(updatedGuests);
  };

  function handleWrongCode () {
      setIsWrongCode(true);
      setTimeout(() => setIsWrongCode(false), 3000)
  }

  async function checkCode () {
      const response = await fetch('/api/rsvp_codes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ code: rsvpCode.toLowerCase() }),
      });

      if (response?.ok) {
          const { numberOfGuests } = await response.json();
          setNumberOfGuests(numberOfGuests);
          console.log('youre in')
          setRsvpCodeStatus('Success')
      }
      else {
          console.log('wrong code')
          handleWrongCode()
          setRsvpCodeStatus('')
      }
  }

  function handleSubmit (e) {
      e.preventDefault();
      if (selectedStep === 0) {
        setRsvpCodeStatus('Pending...')
        checkCode()
      } else {
        handleInitiateSaveGuests()
      }
  }

  function handleInputChange (e) {
      setRsvpCode(e.target.value);
  }

  return (
    <Box sx={{ maxWidth: 500 }} style={{'fontFamily': 'Roboto'}}>
      <Stepper activeStep={selectedStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step}>
            <StepLabel
              optional={
                index === 1 && rsvpCodeStatus === "Success" && !isRSVPComplete ? (
                  <Typography>{numberOfGuests && numberOfGuests > 1 ? `Enter up to ${numberOfGuests} below` : `Please provide your information below`}</Typography>
                ) : index === 0 && selectedStep === 0 ? <Typography>Enter the 4-digit code found on the back of your RSVP card</Typography> : null
              }
            >
              <p className="font-medium text-lg text-blue-900">{step}</p>
            </StepLabel>
            <StepContent>
              <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                {index === 0 ?
                    <TextField
                        className='mt-4'
                        disabled={rsvpCodeStatus === 'Pending...'}
                        error={isWrongCode}
                        value={rsvpCode} 
                        onChange={handleInputChange}
                        autoComplete="off"
                        label="Code"
                        inputProps={{ maxLength: 4 }}
                        helperText={isWrongCode ? 'incorrect code' : ' '}
                    />
                    :
                    <div className='flex flex-col space-y-12 mt-6'>
                        {numberOfGuests && guests.map((guest, index) => (
                          <RSVPForm key={index} guest={guest} onGuestChange={(updatedGuest) => handleGuestChange(index, updatedGuest)} guestNumber={numberOfGuests > 1 && index + 1} />
                        ))}
                    </div>
                }
                <Button
                    className='my-4'
                    type='submit'
                    variant="contained"
                    style={{ color: 'white', backgroundColor: '#183642', width: '230px' }}
                >
                {rsvpCodeStatus === 'Pending...' ? rsvpCodeStatus : index === 0 ? 'Submit' : 'Send RSVP'}
                </Button>
              </form>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {isRSVPComplete && <div className='text-normal pt-10'>You're all Set! We can't wait to see you in Miami!</div>}
      <BasicModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='flex flex-col'>
          <div className='flex flex-col space-y-6 mt-4'>
            {guestToReview !== null && <>
              <div className='font-semibold'>{`Guest ${guestToReview + 1}`}</div>
              <div className='flex flex-col space-y-6 ml-4'>
                <div>
                  <div className='text-sm pb-1 font-semibold text-gray-600'>Name</div>
                  <div>{completedGuests[guestToReview].fullName}</div>
                </div>
                <div>
                  <div className='text-sm pb-1 font-semibold text-gray-600'>Dinner Selection</div>
                  <div>{completedGuests[guestToReview].dinnerSelection}</div>
                </div>
                <div>
                  <div className='text-sm pb-1 font-semibold text-gray-600'>Phone Number</div>
                  <div>{completedGuests[guestToReview].phoneNumber || 'not provided'}</div>
                </div>
                <div>
                  <div className='text-sm pb-1 font-semibold text-gray-600'>Email</div>
                  <div>{completedGuests[guestToReview].email || 'not provided'}</div>
                </div>
              </div>
            </>}
            <div className='flex justify-between'>
                <Button
                    className='my-4'
                    type='button'
                    onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                {_.isEqual(completedGuests[guestToReview], completedGuests[completedGuests.length - 1]) ?
                  <Button
                      className='my-4'
                      type='button'
                      variant='contained'
                      style={{ color: 'white', backgroundColor: '#183642', width: '230px' }}
                      onClick={SubmitRSVP}
                  >
                    Submit RSVP
                  </Button>
                 : 
                  <Button
                      className='my-4'
                      type='button'
                      onClick={handleNextGuest}
                  >
                    Next Guest
                  </Button>
                }
            </div>
          </div>
        </div>
      </BasicModal>
    </Box>
  );
}