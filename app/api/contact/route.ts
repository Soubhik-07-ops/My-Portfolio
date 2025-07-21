import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { isValidEmail } from '@/lib/validation';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Honeypot check
        if (data.website) {
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // Server-side email validation
        if (!isValidEmail(data.email)) {
            return NextResponse.json(
                { error: 'Please use a valid professional email address' },
                { status: 400 }
            );
        }

        // Insert into Supabase
        const { error } = await supabase
            .from('contact_submissions')
            .insert([{
                name: data.name,
                email: data.email,
                company: data.company,
                subject: data.subject,
                message: data.message,
                created_at: new Date().toISOString()
            }]);

        if (error) throw error;

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to process your submission' },
            { status: 500 }
        );
    }
}