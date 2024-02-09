export interface claimingProps {
  claimingStep1: boolean;
  claimingStep2: boolean;
  claimingStep3: boolean;
  claimingStep1Finished: boolean;
  claimingStep2Finished: boolean;
  claimingStep3Finished: boolean;
  restartProcess(): any;
}
