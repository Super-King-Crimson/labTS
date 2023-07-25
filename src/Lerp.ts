export default function lerp(a: number, b: number, t: number): number {
    return t * (b - a) + a;
}


export function lerpN(a: number, b: number, t: number, n: number): number {
    return a + lerp(
        0, 
        (b - a) * Math.pow(1 - t, n), 
        t
    );
    /* Yes, this works. Here's the proof:

    A lerp is a decrementing exponential function where the range (b - a) is decreasing.
    When called once, it lowers its range by t percent
        this is kinda common sense: if you travel 0.25 (25%) of the distance between a and b, you no longer have that 0.25
    That means we can treat lerp as an exponential function over its range and calculate it
        for example: if you have 100 dollars and lose t% of your current money every day, your loss at the nth day as 100 * (1-t)^n
        in the same way if we have 100 meters and we travel t% of it every call, at the nth call we have...

    range = b - a
    newRange = range * (1 - t)^n //this is a standard exponential decay function: a * b^x
    
    now that we have a range, we can just lerp that and add an a to put it in our specific range

    let solution = a + lerp(0, newRange, t);

    you could also add a to that range and run the normal lerp, your choice
    let newA = b - newRange;
    let solution = lerp(newA, b, t);

    This means you can also make lerps work with decimals, which means if you have an update() function you can just call
    let posA = 0;
    let posB = 20;
    let speed = 10; //this can now be assigned actual units AND a range: percent per second, [0, 100)
    someObj.position = lerpN(posA, posB, speed, deltaTime)
    
    actually to make this function work with actual vector3s in unity all you need to do is:
    -create a vector from pointB pointing to pointA
        Vector3 between = (posA - posB).Normalize();
    - create new start position for the lerp
        Vector3 newPosA = posB + (between * Vector3.Distance(posA, posB) * Mathf.pow(1 - t, n))

    //do the lerp
        return Vector3.Lerp(
            newPosA,
            posB,
            t
        )
    - add
            
    */
}