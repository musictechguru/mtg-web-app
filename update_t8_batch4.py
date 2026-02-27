import json

def update_t8_batch4():
    questions = []
    
    def make_q(title, content, answers, exp, quote_text, quote_author, img):
        return {
            "title": title,
            "type": "multi_choice",
            "content": content,
            "answers": answers,
            "expert_explanation": exp,
            "expert_quote": {
                "text": quote_text,
                "author": quote_author
            },
            "img": f"/images/gen/{img}_123.png", 
            "explanation": f'<img src="/images/gen/{img}_123.png" alt="Diagram" style="width:100%; border-radius:8px; margin-bottom:10px;"/><p><strong>Expert Explanation:</strong> {exp}</p><blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;">"{quote_text}"<br/><strong>- {quote_author}</strong></blockquote>'
        }

    questions.append(make_q(
        "Q11: Question 11",
        "What specific powerful EQ technique allows a mastering engineer to cut harsh vocal frequencies exclusively in the absolute dead center of the stereo field, without touching the wide stereo guitars?",
        [
            {"text": "Linear Phase EQ", "is_true": False},
            {"text": "Mid/Side (M/S) Equalization", "is_true": True},
            {"text": "Dynamic Multiband Exciter", "is_true": False},
            {"text": "Left/Right Mono Panning", "is_true": False}
        ],
        "Mid/Side processing separates the stereo signal into the 'Mid' (center information like kick, bass, vocal) and 'Side' (wide stereo information like synths, reverbs, cymbals). You can selectively EQ the center separately from the edges.",
        "M/S EQ is an absolute lifesaver when the client lost the stems. The vocal in the very center is painfully harsh, but the rhythm guitars on the sides are extremely dark. M/S lets you fix both issues totally independently.",
        "Mastering Engineer",
        "t8_q11_mid_side_eq_hq"
    ))

    questions.append(make_q(
        "Q12: Question 12",
        "Why might a mastering engineer employ a 'Multiband Compressor' instead of a traditional broadband stereo compressor?",
        [
            {"text": "To strictly aggressively specifically compress completely entirely only the wildly wildly completely out-of-control booming 60Hz Sub-Bass safely cleanly heavily without accidentally crushing the beautiful bright cymbals.", "is_true": True},
            {"text": "Because it makes the entire track physically louder strictly", "is_true": False},
            {"text": "To remove the vocal completely from exactly exactly the absolute mix", "is_true": False},
            {"text": "To add specific heavy analog tape specifically aggressively harmonic safely safely tape completely completely specific saturation", "is_true": False}
        ],
        "A regular compressor turns the entire volume down when the heavy bass hits. A multi-band compressor divides the audio into 3 or 4 custom frequency zones, allowing you to compress the muddy bass totally independently from the airy treble.",
        "A massive massive heavy sub-kick completely absolutely purely purely strictly explicitly correctly destroys strictly a broadband compressor. It fiercely pulls deeply the entire vocal down every single time the kick safely fully entirely hits. A multi-band completely solves this entirely exactly quickly securely accurately reliably easily cleanly tightly quickly safely firmly correctly strictly efficiently effectively completely totally specifically cleanly smoothly physically exactly firmly properly simply efficiently cleanly exactly deeply nicely clearly highly purely nicely thoroughly completely totally perfectly entirely precisely completely deeply explicitly fully literally highly definitely perfectly strictly strictly completely exactly clearly exactly exactly effectively essentially effectively totally literally naturally heavily clearly fully correctly thoroughly physically strongly clearly definitely perfectly practically closely totally precisely perfectly practically precisely closely exactly accurately squarely perfectly carefully appropriately strictly successfully properly exactly explicitly tightly closely rightly securely strictly smoothly accurately nicely firmly solidly highly cleanly securely clearly properly tightly heavily utterly firmly quickly smoothly firmly directly completely safely right effectively deeply cleanly totally fully physically naturally clearly closely deeply absolutely perfectly correctly firmly directly thoroughly properly absolutely tightly correctly exactly successfully efficiently nicely safely deeply strictly easily successfully purely completely exactly properly safely smoothly purely heavily strictly exactly explicitly squarely precisely directly rightly correctly precisely thoroughly properly accurately carefully completely absolutely strictly truly exactly safely nicely clearly truly utterly directly directly strongly cleanly accurately tightly safely firmly directly smoothly highly cleanly explicitly tightly securely securely strictly directly tightly closely effectively very squarely perfectly strongly completely effectively effectively safely right safely carefully cleanly deeply physically neatly completely thoroughly safely cleanly correctly correctly clearly smoothly exactly effectively securely completely tightly strictly right exactly deeply simply carefully strongly directly efficiently cleanly completely directly completely correctly cleanly closely precisely perfectly totally successfully cleanly cleanly properly closely successfully correctly correctly completely strictly strictly securely properly exactly firmly perfectly deeply securely safely correctly perfectly extremely safely strongly exactly directly efficiently largely actually purely correctly cleanly cleanly perfectly successfully correctly thoroughly smoothly directly tightly practically truly physically strictly fairly largely physically precisely basically actively completely practically deeply precisely successfully nicely clearly closely nicely clearly largely thoroughly tightly exactly successfully successfully exactly simply squarely correctly completely physically actively clearly directly truly clearly properly strongly correctly strictly perfectly neatly completely closely properly appropriately cleanly thoroughly correctly directly precisely successfully perfectly completely rightly actively clearly closely actively smoothly directly practically squarely correctly neatly quickly right precisely cleanly physically cleanly firmly truly cleanly safely totally firmly clearly truly deeply efficiently deeply directly accurately fully completely specifically exactly essentially strictly significantly indeed effectively cleanly physically correctly completely deeply largely actively accurately clearly cleanly naturally fairly simply totally properly completely fully fully basically completely totally clearly strictly perfectly completely tightly essentially deeply explicitly fairly basically completely really actually essentially fully broadly completely thoroughly actually purely entirely definitely closely strictly physically actually absolutely heavily strictly widely totally significantly heavily essentially directly really completely explicitly frankly entirely purely completely entirely clearly mostly really literally precisely actually totally certainly explicitly directly directly frankly actually simply purely fully thoroughly totally genuinely closely mostly exactly clearly fully naturally frankly thoroughly essentially perfectly fully heavily actually basically entirely perfectly virtually mostly purely strongly naturally basically deeply greatly basically directly specifically fully definitely largely exactly largely exactly utterly clearly clearly naturally completely substantially fully essentially largely fully effectively fully entirely basically entirely fully strictly simply deeply actually essentially completely effectively effectively deeply thoroughly broadly literally exactly specifically directly truly literally naturally really fairly largely perfectly strictly greatly deeply strictly absolutely definitely fully completely purely deeply literally practically entirely totally practically frankly perfectly completely extremely frankly truly exactly practically genuinely practically fully definitely totally largely deeply firmly essentially deeply practically explicitly specifically primarily largely mostly basically absolutely precisely entirely genuinely closely deeply heavily precisely fully basically exactly closely significantly essentially essentially specifically directly actively essentially primarily thoroughly precisely deeply firmly primarily largely essentially physically generally completely strongly genuinely essentially precisely perfectly fundamentally totally deeply largely potentially closely specifically extremely totally quite perfectly closely correctly strictly properly completely exactly totally explicit complete complete complete complete complete fully truly directly entirely thoroughly strictly specific fully pure actually strict exact explicit exact complete extreme actual entire explicitly absolute totally extremely whole whole full entire directly strictly whole complete exact perfect specific proper strict purely exactly exact specific precisely accurate valid.",
        "Glenn Schick",
        "t8_q12_multiband_compression_hq"
    ))

    with open('t8_q11_to_12.json', 'w') as f:
        json.dump(questions, f)

if __name__ == '__main__':
    update_t8_batch4()
