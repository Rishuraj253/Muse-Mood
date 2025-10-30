'use client';

import { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createJournalEntry, type State } from '@/app/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Saving...' : 'Save Entry'}
      <Send className="ml-2 size-4" />
    </Button>
  );
}

export function JournalEntryForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useActionState(createJournalEntry, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.errors && Object.keys(state.errors).length > 0) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: state.message,
        });
      } else {
        toast({
          title: 'Success!',
          description: state.message,
        });
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <Card className="animate-fade-in shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">How are you feeling today?</CardTitle>
        <CardDescription>Let it all out. Your journal is a safe space.</CardDescription>
      </CardHeader>
      <form ref={formRef} action={dispatch}>
        <CardContent>
          <Textarea
            name="content"
            placeholder="Write about your day..."
            rows={10}
            required
            minLength={10}
            className="text-base"
          />
          {state.errors?.content && (
            <p className="text-sm font-medium text-destructive mt-2">
              {state.errors.content[0]}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
